import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Overview from './containers/Overview';
import ItemDetail from './containers/ItemDetail';

export default (
  <Route path={App.path} component={App}>
    <Route path={Overview.path} component={Overview} />
    <Route path={ItemDetail.path} component={ItemDetail} />
  </Route>
);
