import StatsApi from '../services/stats';
import ACTIONS from './action_types';

export function loadStats() {
  return dispatch => {
    StatsApi.getPostsStats()
      .then(stats => {
        dispatch({
          type: ACTIONS.STATS_LOADED,
          payload: {stats}
        });
      });
  };
}
