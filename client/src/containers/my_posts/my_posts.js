import {connect} from 'react-redux';
import {loadPostsOfCurrentUser} from '../../actions/posts';
import MyPosts from '../../components/my_posts/my_posts';

function mapStateToProps({auth, posts}) {
  return {
    posts: posts.own,
    loggedUser: auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPostsOfCurrentUser: () => {
      return dispatch(loadPostsOfCurrentUser());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
