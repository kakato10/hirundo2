import React from 'react';
import PropTypes from 'prop-types';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {theme} = this.props.settings;

    return (
      <div className="settings">
        <h1 style={{marginBottom: '30px'}}> Settings </h1>
        <h2> Theme </h2>
        <RadioButtonGroup
          name="Theme"
          defaultSelected={theme}
          onChange={(e, theme) => {
            this.props.changeTheme(theme);
          }}
        >
          <RadioButton
            value="Light"
            label="Light"
            style={styles.radioButton}
          />
          <RadioButton
            value="Dark"
            label="Dark"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
      </div>
    );
  }
}

Login.propTypes = {
  settings: PropTypes.object.isRequired,
  changeTheme: PropTypes.func.isRequired
};
