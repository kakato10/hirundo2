import Connection from './Connection.js';

const API_PATH = '/users';

class UsersApi {
  createUser(userData) {
    return Connection.send(API_PATH, userData, 'POST');
  }

  loadUsers() {
    return Connection.send(API_PATH);
  }

  followUser(userId) {
    return Connection.send(`${API_PATH}/follow`, {userId}, 'POST');
  }

  unfollowUser(userId) {
    return Connection.send(`${API_PATH}/unfollow`, {userId}, 'POST');
  }

  likePost(postId) {
    return Connection.send(`${API_PATH}/like`, {postId}, 'POST');
  }
}

export default new UsersApi();
