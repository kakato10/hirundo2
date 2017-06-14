import {connect} from 'react-redux';
import {loadUsers} from '../../actions/users';
import Feed from '../../components/feed/feed';

function mapStateToProps({users, auth}) {
  return {
    users,
    loggedUser: auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsers: () => {
      return dispatch(loadUsers());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
