import { createStore, createStore as reduxCreateStore,
  applyMiddleware, compose } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import handleTransitions from 'redux-history-transitions';

const MIDDLEWARE = [thunk];

function reduxStore(history) {
  const transitionEnhancer = handleTransitions(history);
  let enhancer = transitionEnhancer;

  if (global.devToolsExtension) {
    enhancer = compose(transitionEnhancer, global.devToolsExtension());
  }

  const store = applyMiddleware(...MIDDLEWARE)(reduxCreateStore)(reducer, enhancer);

  return store;
}

export default reduxStore;
