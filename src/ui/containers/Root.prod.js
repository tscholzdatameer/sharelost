import React, { Component, PropTypes } from 'react'
import Provider from 'react-redux/lib/components/Provider'
import Router from 'react-router/lib/Router'
import routes from '../routes'

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
