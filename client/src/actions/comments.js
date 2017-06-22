import CommentsApi from '../services/comments';
import ACTIONS from './action_types';

export function createComment(postId, commentData) {
  return dispatch => {
    CommentsApi.createComment(postId, commentData)
      .then((data) => {
        return CommentsApi.getCommentByLocation(data.location);
      })
      .then(comment => {
        dispatch({
          type: ACTIONS.COMMENT_CREATED,
          payload: {
            comment
          }
        });
      });
  }
}

export function loadComments(postId) {
  return dispatch => {
    CommentsApi.loadComments(postId)
      .then(comments => {
        dispatch({
          type: ACTIONS.COMMENTS_LOADED,
          payload: {
            comments
          }
        })
      })
  }
}
