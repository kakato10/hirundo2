import {connect} from 'react-redux';
import {likePost, dislikePost} from '../../actions/users';
import {loadPostsByHashtag} from '../../actions/posts';
import {loadTrendingHashtags} from '../../actions/stats';
import HashtagFeed from '../../components/hashtag_feed/hashtag_feed';

function mapStateToProps({auth, posts, stats}) {
  return {
    posts: posts.withHashtag,
    loggedUser: auth.user,
    trendingHashtags: stats.trendingHashtags || []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPostsByHashtag: (hashtag) => {
      return dispatch(loadPostsByHashtag(hashtag));
    },

    loadTrendingHashtags: () => {
      return dispatch(loadTrendingHashtags());
    },

    likePost: (postId) => {
      return dispatch(likePost(postId));
    },

    dislikePost: (postId) => {
      return dispatch(dislikePost(postId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HashtagFeed);
