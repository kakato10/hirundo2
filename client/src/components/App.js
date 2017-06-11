import React from 'react';
import './app.css';
import Login from './login/login';
import {Router, Route, browserHistory} from 'react-router';
import YeomanImage from './yeoman_image/yeoman_image';

function requiresAuth(store, nextState, replace) {
  const currentUser = store.getState().auth.user;

  if (!currentUser) {
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname}
    });
  }
}

export default function App({store}) {
  const requireUser = requiresAuth.bind(this, store);

  return (
    <Router history={browserHistory}>
      <Route path='/'
             onEnter={requireUser}
             component={YeomanImage}>
      </Route>
      <Route path='/login' component={Login} />
    </Router>
  );
}
