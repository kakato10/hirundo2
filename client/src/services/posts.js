import Connection from './Connection.js';
import _ from 'lodash';

const API_PATH = '/posts';

class PostsApi {
  createPost(postData) {
    return Connection.send(API_PATH, postData, 'POST');
  }

  loadPosts() {
    return Connection.send(API_PATH);
  }

  getPostByLocation(location) {
    const id = _.last(location.split('/'));

    return this.getPostById(id);
  }

  getPostById(id) {
    return Connection.send(`${API_PATH}/${id}`);
  }

  getPostsByHashtag(hashtag) {
    return Connection.send(API_PATH, {hashtag});
  }

  getPostsOfCurrentUser() {
    return Connection.send(`${API_PATH}/own`);
  }
}

export default new PostsApi();
