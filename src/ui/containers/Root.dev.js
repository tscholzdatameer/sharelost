import React, { Component, PropTypes } from 'react';
import Provider from 'react-redux/lib/components/Provider';
import Router from 'react-router/lib/Router';
import routes from '../routes';
import DevTools from './DevTools';

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
          <DevTools />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
