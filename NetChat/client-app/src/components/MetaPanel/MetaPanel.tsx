import React, { useContext, useState } from 'react';
import { Accordion, AccordionContent, AccordionTitle, Header, Icon, Image, ListContent, ListDescription, ListHeader, ListItem, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';
import { ChannelType } from '../../models/channels';

export const MetaPanel = observer(() => {

  const [activeIndex, setActiveIndex] = useState(-1)

  const rootStore = useContext(RootStoreContext)
  const { activeChannel, isChannelLoaded } = rootStore.channelStore
  const { userPosts } = rootStore.messageStore
  

  const setCurrentIndex = (event: any, props: any) => {
    const { index } = props

    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }


  const displayTopPosters = (posts: { [name: string] : { avatar: string, count: number} }) => 
  {
    return Object.entries(posts)
            .sort((a, b) => b[1].count - a[1].count)
            .map(([key, val], i) =>(
              <ListItem key={i}>
                <Image avatar src={val?.avatar ?? 'http://www.gravatar.com/avatar/?=identicon'} className="user__posts" />
                <ListContent>
                  <ListHeader as="a">
                    {key}
                  </ListHeader>
                  <ListDescription>
                    {formatCount(val.count)}
                  </ListDescription>
                </ListContent>
              </ListItem>
            ))
            .slice(0, 2) //funcion de arreglo para mostrar ciertos valores del arreglo
  }

  const formatCount = (num: number) =>
    num > 1 || num === 0 ? `${num} posts` : `${num} post`
  


  if(activeChannel?.channelType !== ChannelType.Channel) return null

  return (
    <Segment loading={!isChannelLoaded}>
      <Header as='h3' attached='top'>
        About # {activeChannel && activeChannel.name}
      </Header>
      <Accordion styled attached="true">
          <AccordionTitle 
          onClick={setCurrentIndex}
          active={activeIndex === 0}
          index={0}>
            <Icon name='dropdown' />
            <Icon  name='info'/>
            Channel details
          </AccordionTitle>
          <AccordionContent active={activeIndex === 0} >
            {activeChannel && activeChannel.description}
          </AccordionContent>

          <AccordionTitle 
            onClick={setCurrentIndex}
            active={activeIndex === 1}
            index={1}>
            <Icon name='dropdown' />
            <Icon  name='user circle'/>
            Top Posters
          </AccordionTitle>
          <AccordionContent active={activeIndex === 1}>  
            {
              userPosts && displayTopPosters(userPosts)
            }
          </AccordionContent>

      </Accordion>
    </Segment>
  )
});
