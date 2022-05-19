import React, { useContext, useEffect } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react'
import {SidePanel} from './components/SidePanel/SidePanel';
import { ColorPanel } from './components/ColorPanel/ColorPanel';
import { Messages } from './components/Messages/Messages';
import { MetaPanel } from './components/MetaPanel/MetaPanel';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import { RootStoreContext } from './stores/rootStore';
import { LoadingComponent } from './components/LoadingComponent';
import { observer } from 'mobx-react-lite';

const App = () => {

  const rootStore = useContext(RootStoreContext)
  const { token, setAppLoaded, appLoaded } = rootStore.commonStore
  const { getUser } = rootStore.userStore
  const { createHubConnection, stopHubConnection } = rootStore.messageStore
  const navigate = useNavigate();
  const { isChannelLoaded, channels} = rootStore.channelStore

  const { appUserColors } = rootStore.userStore
  const { secondaryAppColor } = appUserColors

  useEffect(() => {         

      if (token) {
        getUser().finally(() => setAppLoaded())

        //  if(!user)
        //    navigate("/login")  

      } else {
        setAppLoaded()
      }

      createHubConnection()

      // cuando se desmonte app
      return () => {
        stopHubConnection()
      }

  }, [getUser, token, setAppLoaded, appLoaded, createHubConnection, stopHubConnection]) //, createHubConnection, stopHubConnection, navigate
  
  
  // cambiar esto pero no lo se
  axios.interceptors.response.use(undefined, (error) => {    
    
      if(error === undefined || error === null || error.response === undefined )
        return

      if(error.message === "Network Error" && !error.response){
          toast.error("Network Error - Make sure API is running!")
          return; 
      }      

      const {status} = error.response;
    
      if(status === 404){
          navigate("/notfound", {replace: true})              
      }

      if(status === 401){
        navigate("/login")            
      }

      if(status === 500){
        toast.error("Server error - Check the terminal")
      }

      throw error.response
  })

  if (!appLoaded) return <LoadingComponent content="Loading app..." />
  
  return (
    <Grid 
      columns="equal" 
      className='app'
      style={{ background: secondaryAppColor }}>
      <ColorPanel />
      <SidePanel />
      <Grid.Column style={{marginLeft: 320}}>
        { isChannelLoaded && channels.length > 0 && <Messages /> }
      </Grid.Column>
      <Grid.Column width={4}>
      { isChannelLoaded && channels.length > 0 && <MetaPanel /> }
      </Grid.Column>
    </Grid>
  );
}

export default observer(App)