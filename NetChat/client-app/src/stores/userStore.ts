import { makeObservable, observable, computed, action, runInAction } from "mobx";
import agent from "../api/agent";
import { IUser, IUserFormValues, IUserAppColors } from '../models/users';
import { RootStore } from './rootStore';
import md5 from 'md5'

export class UserStore
{   
    constructor(rootStore: RootStore){
       makeObservable(this)
       this.rootStore = rootStore
    }

    rootStore: RootStore

    @observable user: IUser | null = null
    @observable users: IUser[] = []
    @observable isTyping: boolean = false

    @observable appUserColors: IUserAppColors = {
        primaryAppColor: '#4c3c4c',
        secondaryAppColor: '#eee',
      }

    // para indicarnos si esta logeado o no
    @computed get IsLoggedIn(){
        return !!this.user;
    }

    @action login = async (values: IUserFormValues) =>
    {
        try{            
            var user = await agent.User.login(values)    

            runInAction(()=>{           
                this.user = user            
                this.rootStore.commonStore.setToken(user.token)
            })

            return user;
        }catch(error){
            throw error
        }
    }

    @action logout = async(id: string) => {

        try {
            await agent.User.logout(id)

            runInAction(() => {
                this.rootStore.commonStore.setToken(null)
                this.user = null 
            })
        } catch (error) {
            throw error
        }

    }

    @action getUser = async () => {
        try {
          const user = await agent.User.current()
          runInAction(() => {
            this.user = user
          })
        } catch (error) {
          throw error
        }
    }

    @action loadUsers = async () => 
    {
        try{
            this.users = []
            const response = await agent.User.list()

            runInAction(()=> {
                response.forEach((user) => {
                    this.users.push(user)
                })
            })

        }catch(error){
            console.log(error)
          //  throw error
        }
    }

    @action register = async(values: IUserFormValues) =>
    {
        try{

            values.avatar = `http://gravatar.com/avatar/${md5(values.email)}?d=identicon`
            var user = await agent.User.register(values)

            runInAction(() =>{
                this.user = user
                this.rootStore.commonStore.setToken(user.token)
            })
            
        }catch(error){
            console.log(error)
            throw error
        }
    }

    @action saveAppColors = async (colors: IUserAppColors) => {
        try {
          const user = await agent.User.updateColors(colors)
          runInAction(() => {
            this.user = user
            this.user!.primaryAppColor = colors.primaryAppColor
            this.user!.secondaryAppColor = colors.secondaryAppColor
            // user.primaryAppColor = colors.primaryAppColor
            // user.secondaryAppColor = colors.secondaryAppColor
          })
        } catch (error) {
          throw error
        }
    }

    @action setAppColor = (colors: IUserAppColors) => {
        this.appUserColors = colors
      }
}

export default UserStore