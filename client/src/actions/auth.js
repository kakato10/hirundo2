import Auth from '../services/Authentication'
import ACTIONS from './action_types';
import UsersAPI from '../services/users';

export function login(username, password, nextPath) {
  let user;

  return dispatch => {
    return Auth.login(username, password)
      .then(data => {
        dispatch({
          type: ACTIONS.AUTH_COMPLETED,
          payload: data,
          meta: {
            transition: () => {
              return {
                pathname: `/${nextPath}`
              };
            }
          }
        });
      }, error => {
        dispatch({
          type: ACTIONS.AUTH_COMPLETED,
          payload: {
            user: null,
            error: error.message
          }
        });
      });
  };
}

export function register(userData) {
  return dispatch => {
    return UsersAPI.createUser(userData)
      .then(() => {
        dispatch({
          type: ACTIONS.REGISTER_USER,
          payload: {},
          meta: {
            transition: () => {
              return {
                pathname: `/login`
              };
            }
          }
        })
      })
  }
}
