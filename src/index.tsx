import React from 'react';
import ReactDOM from 'react-dom';

import HomePage from './pages/HomePage';
import GlobalStyles from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <HomePage />
  </React.StrictMode>,
  document.getElementById('root'),
);
