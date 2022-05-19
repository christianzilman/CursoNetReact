import React from 'react';
import { Dropdown, Grid, Header, HeaderContent, Icon, Message, Image } from 'semantic-ui-react';
import { useContext } from 'react';
import { RootStoreContext } from '../../stores/rootStore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const UserPanel = () => {

    const rootStore = useContext(RootStoreContext)

    const {user, logout, IsLoggedIn} = rootStore.userStore

    const navigate = useNavigate();

    // console.log("cj")
    // console.log(IsLoggedIn)

    const { appUserColors } = rootStore.userStore
    const { primaryAppColor } = appUserColors


    const clickLogout = async(userId: string) =>{
        await logout(userId)
        navigate("/login")
    }

    const dropdownOptions = () =>
    [
        {
            key: 'user',
            text: 
                <span>
                        Logged as: <strong>{user?.email}</strong>   
                </span>,
            disabled: true,
        },        
        {
            key: 'avatar',
            text: 
                <span>
                    Change avatar
                </span>,
            disabled: true,
        },
        {
            key: "signout",
            text: <span onClick={() => clickLogout(user?.id!)}>Sign out</span>
        }
    ]

  return (
    <Grid style={{backgraound:  `${ primaryAppColor !== null? primaryAppColor: '#4c3c4c'}`, margin: 0}}>
        <Grid.Column>
            <Grid.Row style={{padding: '1.2em', margin: 0}}>
                <Header inverted floated='left' as="h2">
                    <Icon name='code' />
                    <HeaderContent>NetChat</HeaderContent>
                </Header>
            </Grid.Row>
            <Header style={{padding: '0.25em'}} 
            as="h4" inverted>
                {IsLoggedIn && user ? (
                    
                    <Dropdown 
                        trigger={<span>
                                    <Image src={user?.avatar ?? 'http://www.gravatar.com/avatar/?=identicon'} spaced='right' avatar />
                                    {user?.userName}
                                </span>}
                        options={dropdownOptions()}
                    >
                    </Dropdown>
                ):
                (<Message>
                    Don´t han an account? <Link to="/register">Registerssss</Link>
                </Message>)}
            </Header>
        </Grid.Column>
    </Grid>
  );
};
