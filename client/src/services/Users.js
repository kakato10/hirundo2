import Connection from './Connection.js';

const API_PATH = 'users';

class RiderCardsApi {
  createUser(userData) {
    return Connection.send(API_PATH, userData, 'POST');
  }
}
export default new RiderCardsApi();
