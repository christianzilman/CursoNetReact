import React, { useEffect, useContext, useState } from 'react';
import { Icon, Menu, MenuItem } from 'semantic-ui-react';
import { ChannelType, IChannel } from '../../models/channels';
import { ChannelForm } from './ChannelForm';
import { ChannelItem } from './ChannelItem';
import {RootStoreContext} from '../../stores/rootStore';
import { observer } from 'mobx-react-lite'; // observer es con miniscula

export const Channels = observer(()=>
{
        const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null)
        const rootStore = useContext(RootStoreContext)    

        const { 
            channels, 
            loadChannels, 
            showModal, 
            setActiveChannel, 
            getCurrentChannel, 
            channelNotification,
            cleanNotification 
        } =  rootStore.channelStore
        const { loadMessages,  } = rootStore.messageStore
        const { user } = rootStore.userStore

        useEffect(() =>{
            loadChannels( ChannelType.Channel )
        }, [loadChannels]) // se ejecuta una vez           // aqui hay que indicarla la dependencia que necesita el useEffect en este caso lo del channelstore


        const changeChannel = ((channel: IChannel)=>
        {
            setActiveChannel(channel)
            let currentChanelId = getCurrentChannel()?.id!
            loadMessages(currentChanelId)
            setSelectedChannelId(currentChanelId)
            cleanNotification(currentChanelId)
           // console.log(getCurrentChannel())
        })


        const displayChannels = (channels: IChannel[]) =>
        {
            return (
                channels.length > 0   && 
                channels.map((channel) => 
                (
                    <ChannelItem 
                        key={channel.id} 
                        channel={channel} 
                        changeChannel ={changeChannel} 
                        active={ selectedChannelId === channel.id }
                        getNotificationCount = { getNotificationCount }
                    />
                ))
            )
        }        


        const getNotificationCount = (channel: IChannel) => {
           
            let count = 0
            channelNotification.forEach((notification) => {
            if (
                notification.id === channel.id &&
                notification.sender.userName !== user?.userName
            ) {
                count = notification.newMessages
            }
            })

            if (count > 0) return count
        }
        
       
        //console.log(channels);

        return (            

            <React.Fragment>
                <Menu.Menu style={{paddingBottom: '2em'}}>
                <MenuItem>
                    <span>
                        <Icon name='exchange' /> CHANNELS
                    </span> {' '}
                    ({channels.length}) <Icon name='add' onClick={() => showModal(true)}/>
                </MenuItem>

                {displayChannels(channels)}

            </Menu.Menu>

            <ChannelForm />            
            </React.Fragment>   
        )             
})

//export default observer(Channels)