import SettingsApi from '../services/settings';
import ACTIONS from './action_types';

export function changeTheme(theme) {
  return dispatch => {
    SettingsApi.changeTheme(theme)
      .then(({settings}) => {
        dispatch({
          type: ACTIONS.THEME_CHANGED,
          payload: {
            settings
          }
        });
      });
  };
}

export function loadSettings() {
  return dispatch => {
    return SettingsApi.loadSettings()
      .then((settings) => {
        dispatch({
          type: ACTIONS.SETTINGS_LOADED,
          payload: {
            settings
          },
        });
      });
  };
}
