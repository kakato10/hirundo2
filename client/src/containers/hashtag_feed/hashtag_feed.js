import {connect} from 'react-redux';
import {likePost, dislikePost} from '../../actions/users';
import {loadPostsByHashtag} from '../../actions/posts';
import HashtagFeed from '../../components/hashtag_feed/hashtag_feed';

function mapStateToProps({auth, posts}) {
  return {
    posts: posts.withHashtag,
    loggedUser: auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPostsByHashtag: (hashtag) => {
      return dispatch(loadPostsByHashtag(hashtag));
    },

    likePost: (postId) => {
      return dispatch(likePost(postId));
    },

    dislikePost: (postId) => {
      return dispatch(dislikePost(postId));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HashtagFeed);
