import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './stores';
import {browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();
const store = configureStore(browserHistory);

ReactDOM.render(
  <MuiThemeProvider>
    <AppContainer>
      <Provider store={store}>
        <App store={store}/>
      </Provider>
    </AppContainer>
  </MuiThemeProvider>,
  document.getElementById('app')
);

// if (module.hot) {
//   module.hot.accept('./containers/App', () => {
//     const NextApp = require('./containers/App').default; // eslint-disable-line global-require
//
//     ReactDOM.render(
//       <AppContainer>
//         <Provider store={store}>
//           <NextApp />
//         </Provider>
//       </AppContainer>,
//       document.getElementById('app')
//     );
//   });
// }
