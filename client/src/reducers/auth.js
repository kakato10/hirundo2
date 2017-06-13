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

    default: {
      result = _.assign({}, state);
    }
  }

  return result;
}
