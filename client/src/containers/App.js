import React, {
  Component,
} from 'react';
import { connect } from 'react-redux';
import Main from '../components/App';
import {loadSettings} from '../actions/settings';

class App extends Component {
  render() {
    return (
      <Main {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadSettings: () => {
      dispatch(loadSettings());
    }
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
