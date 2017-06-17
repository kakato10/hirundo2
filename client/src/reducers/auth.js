import ACTION_TYPES from '../actions/action_types';
import _ from 'lodash';

const initialState = {
  user: null,
  error: null
};

export default function reducer(state = initialState, action) {
  let result;

  switch (action.type) {
    case ACTION_TYPES.AUTH_COMPLETED: {
      const {user, error} = action.payload;

      result = _.assign({}, state, {user, error});
      break;
    }

    case ACTION_TYPES.USER_FOLLOWED: {
      const {user} = action.payload;

      result = _.assign({}, {user});
      break;
    }

    case ACTION_TYPES.USER_UNFOLLOWED: {
      const {user} = action.payload;

      result = _.assign({}, {user});
      break;
    }

    default: {
      result = _.assign({}, state);
    }
  }

  return result;
}
