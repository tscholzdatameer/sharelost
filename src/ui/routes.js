import React from 'react';
import { Route } from 'react-router';
import { isLoggedIn } from './utils';
import App from './containers/App';
import Login from './containers/Login';
import Overview from './containers/Overview';
import ItemDetail from './containers/ItemDetail';

function requireAuth(nextState, replace) {
  if(!isLoggedIn()) {
    replace({
      pathname: Login.path,
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

export default (
  <Route path={App.path} component={App}>
    <Route path={Login.path} component={Login} />
    <Route path='/auth' onEnter={requireAuth}>
      <Route path={Overview.path} component={Overview} />
      <Route path={ItemDetail.path} component={ItemDetail} />
    </Route>
  </Route>
);
