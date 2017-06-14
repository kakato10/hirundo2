import ACTIONS from './action_types';
import UsersAPI from '../services/users';

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
