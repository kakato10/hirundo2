import {connect} from 'react-redux';
import {register} from '../../actions/auth';
import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.email = null;
    this.username = null;
    this.password = null;
    this.passwordRepeat = null;
    this.state = {
      errors: {
        email: false,
        password: false
      }
    }
  }

  onRegisterClicked() {
    const {email, password, username, passwordRepeat} = this;

    if (email && username && password && passwordRepeat) {
      if (password !== passwordRepeat) {
        const currErrorState = this.state.errors;

        this.setState({
          errors: _.assign({}, currErrorState, {
            password: true
          })
        });

        return;
      }

      this.props.register({
        email,
        password,
        username
      });
    }
  }

  render() {
    const {errors} = this.state;

    return (
      <div className="login">
        <TextField
          hintText="Enter your email"
          floatingLabelText="Email"
          type="text"
          onChange={(e, email) => {
            this.email = email;
          }}
        /><br/>
        <TextField
          hintText="Enter your username"
          floatingLabelText="Username"
          type="text"
          onChange={(e, username) => {
            this.username = username;
          }}
        /><br/>
        <TextField
          hintText="Enter your password"
          floatingLabelText="Password"
          type="password"
          errorText={errors.password ? "Passwords do not match!" : ''}
          onChange={(e, password) => {
            this.password = password;
          }}
        /><br/>
        <TextField
          hintText="Enter your password again"
          floatingLabelText="Password repeat"
          type="password"
          onChange={(e, password) => {
            this.passwordRepeat = password;
          }}
        /><br/>
        <FlatButton
          label="Register"
          primary={true}
          onTouchTap={() => {
            this.onRegisterClicked();
          }}/>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    register: (userData) => {
      dispatch(register(userData));
    }
  };
}

export default connect(null, mapDispatchToProps)(RegistrationForm);
