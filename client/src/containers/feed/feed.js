import {connect} from 'react-redux';
import {loadUsers, followUser, unfollowUser} from '../../actions/users';
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
