import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from '../src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
          <Landing />
        </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();