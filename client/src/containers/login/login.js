import {connect} from 'react-redux';
import {login} from '../../actions/auth';
import Login from '../../components/login/login';

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password, nextPath) => {
      dispatch(login(username, password, nextPath));
    }
  };
}

export default connect(null, mapDispatchToProps)(Login);
