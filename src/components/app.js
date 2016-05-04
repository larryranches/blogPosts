import React, { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import configureScenes from '../_config/scenes';

const RouterWithRedux = connect()(Router);

export default class App extends Component {
  render() {
    return (
      <RouterWithRedux scenes={configureScenes()} />
    )  
  }
}

