import {connect} from 'react-redux';
import {login} from '../../actions/auth';
import LabeledInput from '../labeled_input/labeled_input';
import React from 'react';

class Login extends React.Component {
  // static propTypes = {
  //   onLogin: React.PropTypes.func.isRequired
  // };

  constructor(props) {
    super(props);
    this.username = null;
    this.password = null;
  }

  onLoginClicked() {
    this.props.login(this.username, this.password, '');
  }

  render() {
    return (
      <div className='login'>
        <LabeledInput
          type='text'
          className='username-input'
          onChange={(username) => {
            this.username = username;
          }}
          label='Username'
        />
        <LabeledInput
          type='password'
          className='password-input'
          onChange={(password) => {
            this.password = password;
          }}
          label='Password'
        />
        <button onClick={() => {
          this.onLoginClicked();
        }}>
          Login
        </button>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password, nextPath) => {
      dispatch(login(username, password, nextPath));
    }
  };
}

export default connect(null, mapDispatchToProps)(Login);
