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

export function loadTrendingHashtags() {
  return dispatch => {
    StatsApi.getTrendingHashtags()
      .then(stats => {
        dispatch({
          type: ACTIONS.STATS_TRENDING_LOADED,
          payload: {stats}
        });
      });
  };
}
