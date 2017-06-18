import Connection from './Connection.js';
import _ from 'lodash';

const API_PATH = '/comments';

class CommentsApi {
  createComment(commentData) {
    return Connection.send(`${API_PATH}`, commentData, 'POST');
  }

  loadComments(postId) {
    return Connection.send(`${API_PATH}`, {postId});
  }

  getCommentByLocation(location) {
    const id = _.last(location.split('/'));

    return this.getCommentById(id);
  }

  getCommentById(id) {
    return Connection.send(`${API_PATH}/${id}`);
  }
}

export default new CommentsApi();
