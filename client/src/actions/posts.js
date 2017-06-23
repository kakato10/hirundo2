import PostsApi from '../services/posts';
import ACTIONS from './action_types';

export function createPost(postData) {
  return dispatch => {
    PostsApi.createPost(postData)
      .then((data) => {
        //TODO: WTF have I written?
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

export function loadPosts() {
  return dispatch => {
    PostsApi.loadPosts()
      .then(posts => {
        dispatch({
          type: ACTIONS.POSTS_LOADED,
          payload: {
            posts
          }
        })
      })
  }
}

export function loadPostsByHashtag(hashtag) {
  return dispatch => {
    PostsApi.getPostsByHashtag(hashtag)
      .then(posts => {
        dispatch({
          type: ACTIONS.POSTS_LOADED_BY_HASHTAG,
          payload: {posts}
        });
      });
  };
}

export function loadPostsOfCurrentUser() {
  return dispatch => {
    PostsApi.getPostsOfCurrentUser()
      .then(posts => {
        dispatch({
          type: ACTIONS.USER_POSTS_LOADED,
          payload: {posts}
        });
      });
  };
}
