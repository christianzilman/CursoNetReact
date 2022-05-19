import React, { useState } from 'react'
import { Icon, MenuItem, MenuMenu } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import {useContext, useEffect} from 'react';
import { RootStoreContext } from '../../stores/rootStore';
import { IUser } from '../../models/users';
import { toJS } from 'mobx';


export const DirectMessages = observer(() => {

    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
    const rootStore = useContext(RootStoreContext)    

    const {loadUsers, users, user} = rootStore.userStore
    const { changePrivateChannel, getCurrentChannel } = rootStore.channelStore
    const { loadMessages } = rootStore.messageStore

    const getNumberOfUsers = (users: IUser[]) => 
        users.filter((x) => x.id !== user?.id).length     

    const changeChannel = async(user: IUser) =>{
        //console.log(toJS(user).id)
        const userId = toJS(user).id

        await changePrivateChannel(toJS(user).id)

        //loadMessages(getCurrentChannel()?.id!)
        const currentChanelId = getCurrentChannel()?.id

        //console.log(channelId)

        loadMessages(currentChanelId)
        setSelectedUserId(userId)
    }

    const isUserOnline = (user: IUser) => user.isOnline

    useEffect(() =>{
        loadUsers()
    }, [loadUsers, changePrivateChannel, loadMessages, getCurrentChannel])

  return (
    <MenuMenu className='menu'>
        <MenuItem>
            <span>
                <Icon name="mail"/> DIRECT Messages
            </span> {getNumberOfUsers(users)}
        </MenuItem>

        {
            users.filter((x) => x.id !== user?.id).map((user) => (
                <MenuItem key={user.userName} style={{opacity: 0.7, fontStyle: 'italic'}}
                    onClick={() => changeChannel(user)}
                    active={ selectedUserId === user.id }
                >

                    <Icon name='circle' color={isUserOnline(user) ? 'green' : 'red'} />
                    @ {user.userName}
                </MenuItem>
            ))
        }
    </MenuMenu>
  )
})
