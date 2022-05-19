import { action, observable, runInAction, makeObservable } from 'mobx';
import agent from "../api/agent";
import { IMessage, IMessageFormValues, IMediaFormValues, ITypingNotification, ITypingNotificationFromValues } from '../models/messages';
import { RootStore } from './rootStore';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { Typing } from '../components/Messages/Typing';



export default class MessageStore
{
    rootStore: RootStore

    @observable messages: IMessage[] = []
    @observable isModalVisible: boolean = false
    @observable.ref hubConnection: HubConnection | null; //al crearlo y cerrar la conexion vamos a reaccionar 
    @observable userPosts: { [name: string] : { avatar: string, count: number} } = {}
    @observable typingNotifications: ITypingNotification[]= []
    
    constructor(rootStore: RootStore)
    {
        makeObservable(this)
        this.rootStore = rootStore
        this.hubConnection = null
    }

    @action createHubConnection = () => {

        console.log(this.rootStore.commonStore.token!)

        this.hubConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:5000/chat", {            
                accessTokenFactory : () => this.rootStore.commonStore.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build()

        this.hubConnection.start()
        .then(() => console.log("conexion realizada hub") )//console.log(this.hubConnection?.state!))
        .catch((error) => console.log('error establishing connection', error))


        this.hubConnection.on('ReceiveMessage', (message: IMessage) => {

            runInAction(() =>{ 
                console.log("mesnaje recivido signalr")
                this.messages.push(message)
                this.rootStore.channelStore.addNotification(message.channelId, message)
            })
        })


        this.hubConnection.on('ReceiveTypingNotification', (typingNotification: ITypingNotification) => {

            runInAction(() =>{ 
                this.typingNotifications.push(typingNotification)

            })
        })

        this.hubConnection.on('ReceiveDeleteTypingNotification', (typingNotification: ITypingNotification) => {

            runInAction(() =>{ 
                this.typingNotifications = this.typingNotifications.filter((x) => x.sender.id !== typingNotification.sender.id)
                
            })
        })
    }

    @action stopHubConnection = () => {
        this.hubConnection?.stop()
    }

    @action sendMessage =async (message:IMessageFormValues) => {
        try{
            
            await this.hubConnection!.invoke('SendMessage', message)

            await this.deleteTypingNotification()

            // así era con api
            // const result = await agent.Messages.send(message)

            // runInAction(() =>{
            //     this.messages.push(result)
            // })
        }catch(error){
            throw error
        }
    }

    @action loadMessages = async(channelId: string) =>{
        try{
            this.messages = []

            if(channelId !== undefined)
            {
                const result = await this.rootStore.channelStore.detail(channelId)

                //console.log(result)
    
                runInAction((
                    () => {
                        //console.log(`messages:${JSON.stringify(result, undefined, 2)}`)
                        result.messages?.forEach((message) => this.messages.push(message))
                        console.log(`load message channnelId ${channelId}`)
                        this.countUserPosts(result.messages)
                    }
                ))
            }

        }catch(error){
            throw error
        }
    }

    @action uploadImage = async (values: IMediaFormValues) => {
        try{
            //const result = 
            await agent.Messages.sendMedia(values)

            // ya no es necesario esto por ya lo hace singalr
            // runInAction(() =>{
            //     this.messages.push(result)
            //     console.log(result)
            // })

        }   catch(error){
            console.log(error)
            throw error
        }
    }

    @action showModal = (show: boolean)=>
    {   
        console.log(show)
        this.isModalVisible = show
    }

    @action countUserPosts = (messages: IMessage[] | undefined) =>{
        
        let userPosts = messages?.reduce((acc: any, message) => {
            if(message.sender.userName in acc){
                acc[message.sender.userName].count += 1
            }else{
                acc[message.sender.userName] = {
                    avatar: message.sender.avatar,
                    count: 1,
                }
            }

            return acc
        }, {})

        this.userPosts = userPosts
    }

    @action sendTypingNotification = async(channelId: string) => {
        try {
            
            if(this.rootStore.userStore.isTyping) return 

            let typingNotification : ITypingNotificationFromValues = {
                channelId: channelId,                
            }

            await this.hubConnection?.invoke('SendTypingNotification', typingNotification)

            this.rootStore.userStore.isTyping = true

        } catch (error) {
            throw error
            console.log(error)
        }
    }

    @action deleteTypingNotification = async() => {
        try {
            
            this.rootStore.userStore.isTyping = false


            await this.hubConnection?.invoke('DeleteTypingNotification')

        } catch (error) {
            throw error
            console.log(error)
        }
    }
}