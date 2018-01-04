import ACTION_TYPES from '../actions/action_types';
import _ from 'lodash'

const initialState = {
  theme: 'Light'
};

function extractSettings(action) {
  const {settings} = action.payload;

  return _.isEmpty(settings)
    ? initialState
    : settings;
}

export default function reducer(state = initialState, action) {
  let result;

  switch (action.type) {
    case ACTION_TYPES.THEME_CHANGED: {
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
