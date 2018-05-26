import Connection from './Connection.js';

const API_PATH = '/stats';

class StatsApi {
  getPostsStats() {
    return Connection.send(`${API_PATH}`)
  }

  getTrendingHashtags() {
    return Connection.send(`${API_PATH}/trending`)
  }
}

export default new StatsApi();
