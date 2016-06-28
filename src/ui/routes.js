import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Overview from './containers/Overview';
import ItemDetail from './containers/ItemDetail';

export default (
  <Route path="/" component={App}>
    <Route path="/overview" component={Overview} />
    <Route path="/detail/:id" component={ItemDetail} />
  </Route>
);
