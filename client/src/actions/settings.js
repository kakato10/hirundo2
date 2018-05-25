import SettingsApi from '../services/settings';
import ACTIONS from './action_types';

export function changeSettings(settings) {
  return dispatch => {
    SettingsApi.changeSettings(settings)
      .then(({settings}) => {
        dispatch({
          type: ACTIONS.SETTINGS_LOADED,
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
