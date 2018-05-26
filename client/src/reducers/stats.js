import ACTION_TYPES from '../actions/action_types';
import _ from 'lodash'

const initialState = {};

export default function reducer(state = initialState, action) {
  let result;

  switch (action.type) {
    case ACTION_TYPES.STATS_LOADED: {
      const {stats} = action.payload;

      result = stats;
      break;
    }

    case ACTION_TYPES.STATS_TRENDING_LOADED: {
      const {stats} = action.payload;

      result = _.extend(state, stats);

      break;
    }

    default: {
      result = _.clone(state);
    }
  }

  return result;
}
