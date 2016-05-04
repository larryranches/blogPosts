import React, { Component } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './_config/store';
import App from './components/app';

export default class Root extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <App />
      </Provider>
    )
  }
}