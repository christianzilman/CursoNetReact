import React from 'react'
import { IMessage, MessageType } from '../../models/messages';
import { Comment, CommentAuthor, CommentAvatar, CommentContent, CommentMetadata, CommentText, Image } from 'semantic-ui-react'
import moment from 'moment';
import { observer } from "mobx-react-lite"
import { IUser } from '../../models/users';

interface IProps{
    message: IMessage
    currentUser: IUser | null
}

const isImage = (message: IMessage) =>{
  return message.messageType === MessageType.Media
}

const isOwnMessage = (message: IMessage, user: IUser | null) =>
{
    return message.sender.email === user?.email ? 'message__self': ''
}

export const Message : React.FC<IProps> = observer(({message, currentUser}) => {
  return (

    <Comment>        
        <CommentAvatar 
                src={message.sender?.avatar ?? 'http://www.gravatar.com/avatar/?=identicon'}
            />
        <CommentContent className={isOwnMessage(message, currentUser)}>
            <CommentAuthor as="a">{message.sender?.userName}</CommentAuthor>
            <CommentMetadata>{ moment(message.createdAt).fromNow() }</CommentMetadata>
            {isImage(message) ?(
              <Image src={message.content} className="message__image" />
            ): (
              <CommentText>{message.content}</CommentText>
            )}
            
        </CommentContent>
    </Comment>
  )
})