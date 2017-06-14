import ACTION_TYPES from '../actions/action_types';
import _ from 'lodash';

const initialState = [];

export default function reducer(state = initialState, action) {
  let result;

  switch (action.type) {
    case ACTION_TYPES.USERS_LOADED: {
      const {users} = action.payload;

      result = users;
      break;
    }

    default: {
      result = _.clone(state);
    }
  }

  return result;
}
