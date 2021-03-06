import React, { useContext, useRef, useState } from 'react';
import { Button, ButtonGroup, Form, Segment } from 'semantic-ui-react';
import {Form as FinalForm, Field} from 'react-final-form'
import { IMediaFormValues, IMessageFormValues } from '../../models/messages';
import TextInput from '../Common/Form/TextInput';
import { RootStoreContext } from '../../stores/rootStore';
import { FORM_ERROR } from 'final-form';
import { FileModal } from './FileModal';
import { observer } from 'mobx-react-lite';
import { OnChange } from 'react-final-form-listeners'
import 'emoji-mart/css/emoji-mart.css'
import { Picker, emojiIndex } from 'emoji-mart'

export const MessageForm = observer(() => {

  //const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext)
  const { getCurrentChannel } = rootStore.channelStore
  const { sendMessage, showModal, uploadImage, sendTypingNotification, deleteTypingNotification } = rootStore.messageStore


  let formRef: any
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false)
  const textInputRef = useRef(null)
  const inputElement = textInputRef.current


  const handleTogglePicker = () => {
    setEmojiPicker(!emojiPicker)
  }

  const setFocus = (el: HTMLElement) => {
    el.focus()
  }
  const handleAddEmoji = (emoji: any) => {
    formRef('content', emoji.colons)
    setEmojiPicker(false)
    if (inputElement !== undefined) setFocus(inputElement!)
  }

  const handleSubmitForm = async(values: IMessageFormValues) =>{
    values.channelId = getCurrentChannel()?.id!
    console.log(values)
    await sendMessage(values)
    .then((user) =>
    {  
          console.log("mensaje enviado")
         //navigate("/")
    })
    .catch((error) => ({[FORM_ERROR]: error}))
  }

  const colonToUnicode = (message: any) => {
    return message.replace(/:[A-Za-z0-9_+-]+:/g, (x: any) => {
      x = x.replace(/:/g, '')
      let emoji: any = emojiIndex.emojis[x]
      if (typeof emoji !== 'undefined') {
        let unicode = emoji.native
        if (typeof unicode !== 'undefined') {
          return unicode
        }
      }
      x = ':' + x + ':'
      return x
    })
  }

  const uploadFile = async (image:Blob | null) =>
  {

    const media: IMediaFormValues = 
    {
      file: image!,
      channelId: getCurrentChannel()?.id,
    }

    await uploadImage(media).then(() => {
      console.log("enviada")

    }).catch((error) => ({[FORM_ERROR]: error}))

  }
  

  return (
      <FinalForm
        onSubmit={handleSubmitForm}
        mutators={{
          setValue: ([field, value], state, { changeValue }) => {
            const { formState } = state
  
            changeValue(state, field, () =>
              colonToUnicode(
                `${ formState.values['content'] === undefined ? '': formState.values['content']} ${value}`,
              ),
            )
          },
        }}
        render={({handleSubmit, form, invalid, dirtyFieldsSinceLastSubmit, pristine,}) =>
        {
          if (!formRef) formRef = form.mutators.setValue
          return (
          <Form>            
            <Segment>
              
                {emojiPicker && <Picker set="apple" title='Pick yout emoji' emoji='point_up' onSelect={handleAddEmoji} />}
                <Field
                  fluid
                  name="content"
                  style={{marginBottom: '0.7em'}}
                  IconLabel
                  labelPosition="left"
                  placeholder="Write your mesages"
                  component={TextInput}
                  handleTogglePicker={handleTogglePicker}
                  inputRef={textInputRef}
                  emojiPicker={emojiPicker}
                />

                <OnChange name='content'>
                  {(value: any) => {
                    console.log('from ' + value)
                    if(value!== '')
                      sendTypingNotification(getCurrentChannel()?.id)
                    else
                      deleteTypingNotification()                    
                  }}
                </OnChange>

                <ButtonGroup icon widths="2">
                    <Button
                      color="orange"
                      content="Add Reply"
                      labelPosition='left'
                      icon="edit"
                      disabled={(invalid &&  !dirtyFieldsSinceLastSubmit) || pristine}
                      onClick={()=> handleSubmit()!.then(() => form.reset())}
                    />

                  <Button
                      color="teal"
                      content="Upload Media"
                      labelPosition="right"
                      icon="cloud upload"
                      onClick={()=> showModal(true)}
                    />
                </ButtonGroup>

                <FileModal uploadFile={uploadFile}/>
            </Segment>
          </Form>
          )
        }}
        ></FinalForm>

  );
});
