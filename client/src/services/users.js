import Connection from './Connection.js';

const API_PATH = '/users';

class UsersApi {
  createUser(userData) {
    return Connection.send(API_PATH, userData, 'POST');
  }

  loadUsers() {
    return Connection.send(API_PATH);
  }
}

export default new UsersApi();
