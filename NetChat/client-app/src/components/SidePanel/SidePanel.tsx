import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Channels } from "./Channels";
import { UserPanel } from "./UserPanel";
import { observer } from 'mobx-react-lite';
import { DirectMessages } from "./DirectMessages";
import { Starred } from "./Starred";
import { RootStoreContext } from "../../stores/rootStore";

export const SidePanel = observer(()=> {

    const rootStore = useContext(RootStoreContext)
    const { isChannelLoaded, channels} = rootStore.channelStore

    const { appUserColors } = rootStore.userStore
    const { primaryAppColor } = appUserColors

    return (
        <Menu
            size="large"
            inverted
            fixed="left"
            vertical
            style={{ background:  `${primaryAppColor !== null? primaryAppColor: '#4c3c4c'}`, fontSize: '1.2em'}}
        >
            
            <UserPanel />
            <Starred />
            <Channels />
            { isChannelLoaded && channels.length > 0 &&  <DirectMessages /> }
        </Menu>

    )
})



