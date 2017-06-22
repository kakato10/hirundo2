import ACTION_TYPES from '../actions/action_types';
import _ from 'lodash';

const initialState = {
  all: [],
  withHashtag: [],
  own: []
};

export default function reducer(state = initialState, action) {
  let result;

  switch (action.type) {
    case ACTION_TYPES.POSTS_LOADED: {
      const {posts} = action.payload;

      result = _.assign({}, state, {
        all: posts
      });
      break;
    }

    case ACTION_TYPES.POST_UPDATED: {
      // updated post
      const {post} = action.payload;

      let modifiesPosts = _.clone(state.all);

      modifiesPosts = _.map(modifiesPosts, p => {
        return p.id === post.id ? post : p;
      });

      result = _.assign({}, state, {
        all: modifiesPosts
      });
      break;
    }

    case ACTION_TYPES.POSTS_LOADED_BY_HASHTAG: {
      const {posts} = action.payload;

      result = _.assign({}, state, {
        withHashtag: posts
      });
      break;
    }

    case ACTION_TYPES.USER_POSTS_LOADED: {
      const {posts} = action.payload;

      result = _.assign({}, state, {
        own: posts
      });
      break;
    }

    default: {
      result = _.clone(state);
    }
  }

  return result;
}
