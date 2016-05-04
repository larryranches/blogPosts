import React, { } from 'react-native';
import { Scene, Modal, Actions } from 'react-native-router-flux';
import PostsIndex from '../components/posts_index';
import PostsNew from '../components/posts_new';
import PostsShow from '../components/posts_show';

const scenes =  Actions.create(  
  <Scene key="modal" component={Modal}>
    <Scene key="root" hideNavBar={false} Component={Modal}>
      <Scene initial={true} key="postsIndex" component={PostsIndex} title="Book Index" onRight={() => Actions.postsNew()} rightTitle="Add ( + )"/>
      <Scene key="postsNew" component={PostsNew} title="Add Book" />
      <Scene key="postsShow" component={PostsShow} />
    </Scene>    
  </Scene>
)

export default function configureScenes() {
  return scenes;
}