import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing'
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <Landing />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
