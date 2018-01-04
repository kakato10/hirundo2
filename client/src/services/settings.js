import Connection from './Connection.js';

const API_PATH = '/settings';

class SettingsApi {
  changeTheme(theme) {
    return Connection.send(`${API_PATH}/theme`, {theme}, 'POST');
  }

  loadSettings() {
    return Connection.send(`${API_PATH}`);
  }
}

export default new SettingsApi();
