import Connection from './Connection.js';

class AuthService {
  login(username, password) {
    const path = '/auth/login';
    return Connection.send(path, {username, password}, 'POST')
      .then(data => {
        return data;
      });
  }
}

export default new AuthService();
