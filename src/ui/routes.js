import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Overview from '.containers/Overview';

export default (
  <Route path="/" component={App}>
    <Route path="/overview" component={Overview} />
  </Route>
);
