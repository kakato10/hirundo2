import {connect} from 'react-redux';
import {loadUsers, followUser, unfollowUser,
        likePost, dislikePost} from '../../actions/users';
import {loadPosts} from '../../actions/posts';
import Feed from '../../components/feed/feed';

function mapStateToProps({users, auth, posts}) {
  return {
    users,
    posts,
    loggedUser: auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsers: () => {
      return dispatch(loadUsers());
    },

    followUser: (userId) => {
      return dispatch(followUser(userId));
    },

    unfollowUser: (userId) => {
      return dispatch(unfollowUser(userId));
    },

    loadPosts: () => {
      return dispatch(loadPosts());
    },

    likePost: (postId) => {
      return dispatch(likePost(postId));
    },

    dislikePost: (postId) => {
      return dispatch(dislikePost(postId));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
