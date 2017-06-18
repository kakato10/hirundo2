import {connect} from 'react-redux';
import {login} from '../../actions/auth';
import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


class Login extends React.Component {
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
      <div className="login">
        <TextField
          hintText="Enter your username"
          floatingLabelText="Username"
          type="text"
          fullWidth
          onChange={(e, username) => {
            this.username = username;
          }}
        />
        <TextField
          hintText="Enter your password"
          floatingLabelText="Password"
          type="password"
          fullWidth
          onChange={(e, password) => {
            this.password = password;
          }}
        />
        <FlatButton
          label="Login"
          primary={true}
          fullWidth
          onTouchTap={() => {
            this.onLoginClicked();
          }}/>
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
