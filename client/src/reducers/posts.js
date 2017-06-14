import ACTION_TYPES from '../actions/action_types';
import _ from 'lodash';

const initialState = [];

export default function reducer(state = initialState, action) {
  let result;

  switch (action.type) {
    case ACTION_TYPES.POSTS_LOADED: {
      const {posts} = action.payload;

      result = posts;
      break;
    }

    default: {
      result = _.clone(state);
    }
  }

  return result;
}
