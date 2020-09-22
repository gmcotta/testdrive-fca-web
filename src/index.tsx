import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Review from './pages/Review';
import Appointment from './pages/Appointment';

import GlobalStyles from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/review" component={Review} />
        <Route path="/appointment" component={Appointment} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
