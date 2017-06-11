import Auth from '../services/Authentication'
import ACTIONS from './action_types';

export function login(username, password, nextPath) {
  let user;

  return dispatch => {
    return Auth.login(username, password)
      .then(currentUser => {
        user = currentUser;

        return currentUser;
      })
      .then(() => {
        dispatch({
          type: ACTIONS.AUTH_COMPLETED,
            payload: {
            user,
            error: null
          },
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
