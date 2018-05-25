import ACTION_TYPES from '../actions/action_types';
import _ from 'lodash'
import Translations from '../../translations/';

const initialState = {
  theme: 'Light',
  language: 'en',
  translations: Translations.en
};

function extractSettings(action) {
  const {settings} = action.payload;
  const settingsToStore = _.isEmpty(settings)
    ? initialState
    : settings;

  settingsToStore.translations = Translations[settingsToStore.language];
  console.log(settingsToStore.language);

  return settingsToStore;
}

export default function reducer(state = initialState, action) {
  let result;

  switch (action.type) {
    case ACTION_TYPES.SETTINGS_CHANGED: {
      result = extractSettings(action);
      break;
    }

    case ACTION_TYPES.SETTINGS_LOADED: {
      result = extractSettings(action);
      break;
    }

    case ACTION_TYPES.AUTH_COMPLETED: {
      result = extractSettings(action);
      break;
    }

    default: {
      result = _.clone(state);
    }
  }

  return result;
}
