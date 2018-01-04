import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './stores';
import {browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
const store = configureStore(browserHistory);

ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App store={store}/>
      </Provider>
    </AppContainer>,
  document.getElementById('app')
);
