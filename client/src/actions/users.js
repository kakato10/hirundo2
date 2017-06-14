import ACTIONS from './action_types';
import UsersAPI from '../services/users';
import {loadPosts} from './posts';

export function loadUsers() {
  return dispatch => {
    UsersAPI.loadUsers()
      .then((users) => {
        return dispatch({
          type: ACTIONS.USERS_LOADED,
          payload: {
            users
          }
        });
    });
  }
}

export function followUser(userId) {
  return (dispatch) => {
    UsersAPI.followUser(userId)
      .then(user => {
        dispatch(loadPosts());

        return dispatch({
          type: ACTIONS.USER_FOLLOWED,
          payload: {
            user
          }
        });
      });
  };
}

export function unfollowUser(userId) {
  return (dispatch) => {
    UsersAPI.unfollowUser(userId)
      .then(user => {
        dispatch(loadPosts());

        return dispatch({
          type: ACTIONS.USER_UNFOLLOWED,
          payload: {
            user
          }
        });
      });
  };
}
