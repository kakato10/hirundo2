import ACTION_TYPES from '../actions/action_types';
import _ from 'lodash';

const initialState = [];

export default function reducer(state = initialState, action) {
  let result;

  switch (action.type) {
    case ACTION_TYPES.COMMENT_CREATED: {
      // created comment
      const {comment} = action.payload;

      let comments = _.clone(state);

      comments.push(comment);

      result = comments;
      break;
    }

    case ACTION_TYPES.COMMENTS_LOADED: {
      const {comments} = action.payload;

      result = comments;
      break;
    }

    default: {
      result = _.clone(state);
    }
  }

  return result;
}
