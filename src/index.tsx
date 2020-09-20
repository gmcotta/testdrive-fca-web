import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import GlobalStyles from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
