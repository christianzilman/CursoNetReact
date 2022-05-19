import React, {ChangeEvent, useState, useContext} from 'react';
import { Button, Form, Icon, Input, Modal } from 'semantic-ui-react';
import { IChannel, ChannelType } from '../../models/channels';
import { v4 as uuidv4 } from 'uuid';
import {RootStoreContext} from '../../stores/rootStore'
import { observer } from 'mobx-react-lite';

interface IProps
{
}

export const ChannelForm :React.FC = observer(() => 
{
    const initialChannel: IChannel = {
        id: '',
        name : '',
        description : '',
        channelType: ChannelType.Channel,
    }

    const [channel, setChannel] = useState<IChannel>(initialChannel)

    const rootStore = useContext(RootStoreContext);
    const { isModalVisible, showModal, createChannel } = rootStore.channelStore


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {        
        setChannel({...channel, [event.target.name]: event.target.value})
        console.log(event.target.value)
    }

    const handleSubmit = () =>{

        let newChannel = {
            ...channel,
            id: uuidv4(),
        }

        createChannel(newChannel)
        setChannel(initialChannel)
        showModal(false)
    }
   
  return (
    <Modal basic open={isModalVisible}>
        <Modal.Header>
            Add Channel
        </Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Field>
                    <Input fluid label="Channel Name" name="name" onChange={handleInputChange}/>
                </Form.Field>
                <Form.Field>
                    <Input fluid label="Description" name="description" onChange={handleInputChange}/>
                </Form.Field>
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button basic color='green' inverted onClick={() => {handleSubmit()}}>
                <Icon name='checkmark' /> Add
            </Button>
            <Button color='red' inverted onClick={() => {showModal(false)}}>
                <Icon name='remove'/> Cancel
            </Button>
        </Modal.Actions>
    </Modal>
  );
})


//export default observer(ChannelForm)