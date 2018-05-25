import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import PropTypes from 'prop-types';

export default class RegistrationForm extends React.Component {
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
        <h1>{i18n.label}</h1>
        <TextField
          floatingLabelText={i18n.email}
          type="text"
          fullWidth
          onChange={(e, email) => {
            this.email = email;
          }}
        /><br/>
        <TextField
          floatingLabelText={i18n.username}
          type="text"
          fullWidth
          onChange={(e, username) => {
            this.username = username;
          }}
        /><br/>
        <TextField
          floatingLabelText={i18n.password}
          type="password"
          fullWidth
          errorText={errors.password ? i18n.passwordsNotMatching : ''}
          onChange={(e, password) => {
            this.password = password;
          }}
        /><br/>
        <TextField
          floatingLabelText={i18n.passwordRepeat}
          type="password"
          fullWidth
          onChange={(e, password) => {
            this.passwordRepeat = password;
          }}
        /><br/>
        <FlatButton
          label={i18n.action}
          primary={true}
          fullWidth
          onTouchTap={() => {
            this.onRegisterClicked();
          }}/>
      </div>
    );
  }
}


RegistrationForm.propTypes = {
  register: PropTypes.func.isRequired
};
