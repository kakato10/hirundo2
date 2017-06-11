import React, {
  Component,
} from 'react';
import { connect } from 'react-redux';
import {} from '../actions/';
import Main from '../components/App';

class App extends Component {
  render() {
    return <Main {...this.props} />;
  }
}

export default connect()(App);
