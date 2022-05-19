import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form, Icon, Input, Menu, MenuItem, Modal } from 'semantic-ui-react';
import { IChannel } from '../../models/channels';
import { ChannelItem } from './ChannelItem';

interface IState{
    channels: IChannel[]
    modal: boolean
}

export class Channels extends Component<{},IState> 
{

    state: IState = {
        channels: [],
        modal: false,
    }

    componentDidMount(){
        axios.get<IChannel[]>('http://localhost:5000/api/Channels').then((response) => 
        {
            this.setState({
                channels: response.data,
            });
        });

    }

    openModal = () => this.setState({modal: true});
    closeModal = () => this.setState({modal: false});

    displayChannels = (channels: IChannel[]) =>
    {
        return (
            channels.length > 0   && 
            channels.map((channel) => 
            (
                <ChannelItem key={channel.id} channel={channel} />
            ))
        )
    }

    render()
    {
        const {channels, modal} = this.state;       

        console.log(channels);

        return (
            <React.Fragment>
                <Menu.Menu style={{paddingBottom: '2em'}}>
                <MenuItem>
                    <span>
                        <Icon name='exchange' /> CHANNELS
                    </span> {' '}
                    ({channels.length}) <Icon name='add' onClick={this.openModal}/>
                </MenuItem>

               {this.displayChannels(channels)}

            </Menu.Menu>

            <Modal basic open={modal}>
                <Modal.Header>
                    Add Channel
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <Input fluid label="Channel Name" name="ChannelName"/>
                        </Form.Field>
                        <Form.Field>
                            <Input fluid label="Description" name="ChannelDescription"/>
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='green' inverted>
                        <Icon name='checkmark' /> Add
                    </Button>
                    <Button color='red' inverted onClick={this.closeModal}>
                        <Icon name='remove'/> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
            </React.Fragment>            
        )
    }
};
