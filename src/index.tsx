import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import {history } from './redux/store';
import {store,persist} from './redux/store';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router';

import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
  <PersistGate persistor={persist}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
