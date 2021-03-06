import React, { useContext, useEffect, useState } from 'react';
import { CommentGroup, Segment } from 'semantic-ui-react';
import { MessageForm } from './MessageForm';
import { MessagesHeader } from './MessagesHeader';
import { RootStoreContext } from '../../stores/rootStore';
import { IMessage, ITypingNotification } from '../../models/messages';
import { Message } from './Message';
import { observer } from 'mobx-react-lite';
import { Typing } from './Typing';

interface ISearchFormState 
{
  searchTem?: string
  searchLoading: boolean
}

export const Messages = observer(() => {

  let messageEnd: any

  const searchFormInitialState: ISearchFormState = {
    searchTem : '',
    searchLoading: false,
  }
  const [searchState, setSearchState] = useState<ISearchFormState>(searchFormInitialState)

  const [messageState, setMessageState] = useState<IMessage[]>([])
  const [numUniqueUsers, setNumUniqueUsers] = useState(0)

  const rootStore = useContext(RootStoreContext)

  const { activeChannel, setChannelStarred, getCurrentChannel } = rootStore.channelStore
  const { messages, typingNotifications } = rootStore.messageStore 
  const {user} = rootStore.userStore

  const handleSearchMessages = //useCallback(
    () => {
    
    if(searchState.searchTem === '')
      {
          setMessageState([])
          setSearchState({
            searchLoading: true
          })
          return
      }
    
      const channelMessages = [...messages]
      const regex = RegExp(searchState.searchTem!, 'gi')
      const searchResult = channelMessages.reduce((acc: IMessage[], message) => {

        if(message.content && (message.content.match(regex) || message.sender.userName.match(regex))){
          acc.push(message)
        }

        return acc
      }, [])

      setMessageState(searchResult)
      setSearchState({
        searchLoading: false
      })    
  } //, [searchState, messages])

  const handleSearchChange = (event: any) =>
  {
      setSearchState({
        searchTem: event.target.value,
        searchLoading: true,
      })
  }


  const countUniqueUsers = (messages: IMessage[]) => {
    
    const uniqueUsers = messages.reduce((acc: string[], message) => {
        if(!acc.includes(message.sender.userName)){
          acc.push(message.sender.userName)
        }

        return acc;
    }, [])
        
    return uniqueUsers.length
  }


  useEffect(() =>{ 
    
    if(searchState.searchLoading){
      handleSearchMessages()
    }

    if(messageEnd){
      scrollToBottom()
    }

    setNumUniqueUsers(countUniqueUsers(messageState.length > 0 ? messageState : messages))

  }, [handleSearchMessages, searchState, messages])


  const scrollToBottom = () => {
      messageEnd.scrollIntoView({ behavior: 'smooth' })
  }
  
  const displayMessages = (messages: IMessage[]) => {

    try {

        return (messages.length > 0 && 
          messages.map((message, index) =>{
            
            if(message.channelId !== activeChannel?.id) return

            return <Message key={`${message.createdAt.toString()} ${index}`} message={message} currentUser={user}></Message>            
            
          }))
      
    } catch (error) {
      console.log(`error chanelStore ${error}`)
    }   
  }  

  const displayTypingUsers = (typingNotifications: ITypingNotification[]) =>
  typingNotifications.length > 0 &&
  typingNotifications.map((typing) => {
    if (typing.channel.id !== activeChannel?.id) return
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '0.2em',
        }}
        key={typing.sender.id}
      >
        <span className="user__typing">
          {typing.sender.userName} is typing
        </span>{' '}
        <Typing />
      </div>
    )
  })
  

  const handleStar = () => {
      setChannelStarred(activeChannel!)
  }

  return (
    <React.Fragment>
      {/* Header */}
      <MessagesHeader 
        currentChannel={getCurrentChannel()} 
        currentUser={user} 
        handleStar={handleStar} 
        handleSearchChange={handleSearchChange}
        numUniqueUsers = {numUniqueUsers}
      />

      <Segment>
        <CommentGroup className='messages'>
            {displayMessages( messageState.length > 0 ?  messageState : messages)}
            {displayTypingUsers(typingNotifications)}
            <div ref={(node) => (messageEnd = node)}></div>
        </CommentGroup>
      </Segment>

      <MessageForm />

    </React.Fragment>
  );
})
