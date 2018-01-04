import React from 'react';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {loadSettings} from 'actions/settings';
import Paper from 'material-ui/Paper';

import RegistrationForm from '../containers/registration_form/registration_form';
import Login from '../containers/login/login';
import Feed from '../containers/feed/feed';
import HashtagFeed from '../containers/hashtag_feed/hashtag_feed';
import MyPosts from '../containers/my_posts/my_posts';
import Settings from '../containers/settings/settings';
import Layout from '../containers/layout/layout';
import Stats from '../containers/stats/stats';

import './app.css';

const availableThemes = {
  Light: lightBaseTheme,
  Dark: darkBaseTheme
};

const style = {
  height: '100%',
};

function requiresAuth(store, nextState, replace) {
  const currentUser = store.getState().auth.user;

  if (!currentUser) {
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname}
    });
  }
}

export default class App extends React.Component {
  componentDidMount() {
    this.props.loadSettings();
  }

  render() {
    const {store, settings} = this.props;
    const theme = availableThemes[settings.theme];
    const requireUser = requiresAuth.bind(this, store);

    return (
      <div style={style}>
        <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
          <Paper style={style} zDepth={1}>
            <Router history={browserHistory}>
              <Route path='/' component={Layout}>
                <IndexRedirect to="/feed"/>
                <Route path="feed"
                       onEnter={requireUser}
                       component={Feed}/>
                <Route path="register"
                       component={RegistrationForm}/>
                <Route path='login'
                       component={Login}/>
                <Route path="stats"
                       component={Stats}/>
                <Route path="hashtag_feed"
                       onEnter={requireUser}
                       component={HashtagFeed}/>
                <Route path="my_posts"
                       onEnter={requireUser}
                       component={MyPosts}/>
                <Route path="settings"
                       onEnter={requireUser}
                       component={Settings}/>
              </Route>
            </Router>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}
