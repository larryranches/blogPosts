import { createStore, applyMiddleware, combineReducers } from 'redux';
import promise from 'redux-promise'
import rootReducer from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}