import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Review from './pages/Review';
import Appointment from './pages/Appointment';
import TesteStepper from './pages/TesteStepper';

import GlobalStyles from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/review" component={Review} />
        <Route path="/appointment" component={Appointment} />
        <Route path="/teste" component={TesteStepper} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
