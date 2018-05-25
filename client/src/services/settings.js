import Connection from './Connection.js';

const API_PATH = '/settings';

class SettingsApi {
  changeSettings(settings) {
    return Connection.send(`${API_PATH}/theme`, settings, 'POST');
  }

  loadSettings() {
    return Connection.send(`${API_PATH}`);
  }
}

export default new SettingsApi();
