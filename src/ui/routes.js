import React from 'react';
import { Route } from 'react-router';
import { isLoggedIn } from './utils';
import App from './containers/App';
import Login from './containers/Login';
import Register from './containers/Register';
import ItemList from './containers/ItemList';
import ItemDetail from './containers/ItemDetail';
import ItemAdd from './containers/ItemAdd';

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
    <Route path={Register.path} component={Register} />
    <Route path='/auth' onEnter={requireAuth}>
      <Route path={ItemList.getPath()} component={ItemList} />
      <Route path={ItemDetail.getPath()} component={ItemDetail} />
      <Route path={ItemAdd.getPath()} component={ItemAdd} />
    </Route>
  </Route>
);
