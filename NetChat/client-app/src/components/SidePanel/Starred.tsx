import React, {useState} from 'react'
import { Icon, MenuItem, MenuMenu } from 'semantic-ui-react';
import {useContext, useEffect} from 'react';
import { RootStoreContext } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';
import { ChannelType, IChannel } from '../../models/channels';
import { ChannelItem } from './ChannelItem';


export const Starred = observer(() => {

  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null)
  const rootStore = useContext(RootStoreContext)
  const { 
    starredChannels, 
    setActiveChannel, 
    getCurrentChannel, 
    loadChannels, 
    channelNotification, 
    cleanNotification } = rootStore.channelStore
  const { loadMessages } = rootStore.messageStore
  const { user } = rootStore.userStore


  useEffect(() =>{
    loadChannels(ChannelType.Starred)
  },[loadChannels])


  const changeChannel = ((channel: IChannel)=>
  {
      setActiveChannel(channel)
      let currentChanelId = getCurrentChannel()?.id!
      loadMessages(currentChanelId)
      setSelectedChannelId(currentChanelId)   
      cleanNotification(currentChanelId)   
      // console.log(getCurrentChannel())
  })

  const getNotificationCount = (channel: IChannel) => {
    let count = 0
    channelNotification.forEach((notification) => {
        if(notification.id === channel.id && notification.sender.userName !== user?.userName){
            count = notification.newMessages
        }
    })

    if(count > 0) 
        return count
  }


  const displayChannels = (channels: IChannel[]) => channels.length > 0 && (
      channels.map((channel) => (
        <ChannelItem 
        key={channel.id}
        channel={channel}
        changeChannel= {changeChannel}
        active={ selectedChannelId === channel.id }
        getNotificationCount={getNotificationCount}
        />
      ))
  )

  return (
    <React.Fragment>
        <MenuMenu style={{ paddingBottom: '2em' }}>
            <MenuItem>
                <span>
                    <Icon  name='exchange' /> STARRED
                </span> {' '}

                ({starredChannels.length}) {' '}
            </MenuItem>
            {displayChannels(starredChannels)}
        </MenuMenu>
    </React.Fragment>
  )
})
