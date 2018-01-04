/* eslint-disable import/newline-after-import */
/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
/* Populated by react-webpack-redux:reducer */
import { combineReducers } from 'redux';
import authReducer from './auth';
import usersReducer from './users';
import postsReducer from './posts';
import commentsReducer from './comments';
import settingsReducer from './settings';

const reducers = {
  auth: authReducer,
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
  settings: settingsReducer
};

const combined = combineReducers(reducers);

module.exports = combined;
