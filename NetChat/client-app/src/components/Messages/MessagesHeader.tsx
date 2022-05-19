import { observer } from 'mobx-react-lite';
import React from 'react';
import { Header, HeaderSubheader, Icon, Segment } from 'semantic-ui-react';
import { ChannelType, IChannel } from '../../models/channels';
import { IUser } from '../../models/users';
import { SearchInput } from './SearchInput';

interface IProps
{
    currentChannel: IChannel | null
    currentUser: IUser | null
    handleStar: () => void
    handleSearchChange: (event:any) => void
    numUniqueUsers: number
}

export const MessagesHeader: React.FC<IProps> = observer((
    {
        currentChannel, 
        currentUser, 
        handleStar, 
        handleSearchChange, 
        numUniqueUsers
    }) => {

    const isPrivateChannel = () => currentChannel?.channelType === ChannelType.Room
    const isChannelStarred = currentChannel?.channelType === ChannelType.Starred

  return (
    <Segment clearing>



        { isPrivateChannel()?
            (<Header
                fluid= "true"
                as="h2"
                floated="left"
                style={{marginBottom: 0}}            
            >
                
                <span>                    
                    {
                        '@' +
                        (currentUser?.userName === currentChannel?.name 
                            ? currentChannel?.description 
                            : currentChannel?.name)
                    }
                </span>

                <HeaderSubheader>
                    {numUniqueUsers + '  Users'} 
                </HeaderSubheader>
            </Header>)
        :
            (<Header
                fluid= "true"
                as="h2"
                floated="left"
                style={{marginBottom: 0}}            
            >                
                <span>
                    {currentChannel?.name}
                    
                    <Icon 
                        name={isChannelStarred ? "star" : "star outline"} 
                        color={ isChannelStarred ? 'yellow' : 'black'}
                        onClick={handleStar}
                    />
                </span>

                <HeaderSubheader>
                    {numUniqueUsers + '  Users'} 
                </HeaderSubheader>
            </Header>)
        }

        <SearchInput handleSearchChange={handleSearchChange}/>
    </Segment>
  );
});
