import { combineReducers } from 'redux';
import routes from './routes';
import PostsReducer from './reducer_posts';
// ... other reducers

export default combineReducers({
  routes: routes,
  posts: PostsReducer
});