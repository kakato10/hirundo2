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
    const {theme, language} = this.props.settings;

    return (
      <div className="settings">
        <h1 style={{marginBottom: '30px'}}> {i18n.label} </h1>
        <h2> {i18n.theme} </h2>
        <RadioButtonGroup
          name="Theme"
          defaultSelected={theme}
          onChange={(e, theme) => {
            this.props.changeSettings({
              theme,
              language
            });
          }}
        >
          <RadioButton
            value="Light"
            label={i18n.themes.light}
            style={styles.radioButton}
          />
          <RadioButton
            value="Dark"
            label={i18n.themes.dark}
            style={styles.radioButton}
          />
        </RadioButtonGroup>
        <h2> {i18n.language} </h2>
        <RadioButtonGroup
          name="Language"
          defaultSelected={language}
          onChange={(e, language) => {
            this.props.changeSettings({
              theme,
              language
            });
          }}
        >
          <RadioButton
            value="en"
            label={i18n.languages.en}
            style={styles.radioButton}
          />
          <RadioButton
            value="bg"
            label={i18n.languages.bg}
            style={styles.radioButton}
          />
        </RadioButtonGroup>
      </div>
    );
  }
}

Login.propTypes = {
  settings: PropTypes.object.isRequired,
  changeSettings: PropTypes.func.isRequired
};
