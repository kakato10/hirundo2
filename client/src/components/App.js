import React from 'react';

import {Router, Route, browserHistory, IndexRedirect} from 'react-router';

import RegistrationForm from '../containers/registration_form/registration_form';
import Login from '../containers/login/login';
import Feed from '../containers/feed/feed';
import HashtagFeed from '../containers/hashtag_feed/hashtag_feed';
import MyPosts from '../containers/my_posts/my_posts';
import Layout from '../containers/Layout/Layout';

import './app.css';

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
    <div>
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
          <Route path="hashtag_feed"
                 onEnter={requireUser}
                 component={HashtagFeed}/>
          <Route path="my_posts"
                 onEnter={requireUser}
                 component={MyPosts}/>
        </Route>
      </Router>
    </div>
  );
}
