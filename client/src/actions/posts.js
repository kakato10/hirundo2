import PostsApi from '../services/posts';
import ACTIONS from './action_types';

export function createPost(postData) {
  return dispatch => {
    PostsApi.createPost(postData)
      .then((data) => {
        return PostsApi.getPostByLocation(data.location);
      })
      .then((post) => {
        dispatch({
          type: ACTIONS.POST_CREATED,
          payload: {
            post
          }
        });
      });
  }
}
