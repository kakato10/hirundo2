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

function exportTranslations(store, nextState) {
  const translations = store.getState().settings.translations;

  const location = nextState.location.pathname.slice(1)
    .split('_')
    .reduce((agg, curr, index) => {
      if (index) {
        return `${agg}${curr[0].toUpperCase()}${curr.slice(1)}`;
      }

      return curr;
    }, '');
  window.currLocation = location;
  window.i18n = translations[location];
}

function sequelize(functions) {
  return (nextState, replace) => {
    functions.forEach(f => {
      f(nextState, replace);
    });
  };
}

export default class App extends React.Component {
  componentDidMount() {
    this.props.loadSettings();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.settings.language !== nextProps.settings.language) {
      window.i18n = nextProps.settings.translations[window.currLocation];
    }
  }

  render() {
    const {store, settings} = this.props;
    const theme = availableThemes[settings.theme];
    const requireUser = requiresAuth.bind(this, store);
    const getTranslations = exportTranslations.bind(this, store);

    return (
      <div style={style}>
        <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
          <Paper style={style} zDepth={1}>
            <Router history={browserHistory}>
              <Route path='/' component={Layout}>
                <IndexRedirect to="/feed"/>
                <Route path="feed"
                       onEnter={sequelize([getTranslations, requireUser])}
                       component={Feed}/>
                <Route path="register"
                       onEnter={sequelize([getTranslations])}
                       component={RegistrationForm}/>
                <Route path='login'
                       onEnter={sequelize([getTranslations])}
                       component={Login}/>
                <Route path="statistics"
                       onEnter={sequelize([getTranslations])}
                       component={Stats}/>
                <Route path="hashtag_feed"
                       onEnter={sequelize([getTranslations, requireUser])}
                       component={HashtagFeed}/>
                <Route path="my_posts"
                       onEnter={sequelize([getTranslations, requireUser])}
                       component={MyPosts}/>
                <Route path="settings"
                       onEnter={sequelize([getTranslations, requireUser])}
                       component={Settings}/>
              </Route>
            </Router>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}
