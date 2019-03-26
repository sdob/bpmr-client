import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';
import reducer from './reducer';

const middleware = applyMiddleware(thunk);
const store = createStore(reducer, compose(middleware));

ReactDOM.render(
  <Provider store={store}>
    < App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
