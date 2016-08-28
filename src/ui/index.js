import React from 'react';
import { render } from 'react-dom';
import browserHistory from 'react-router/lib/browserHistory';
import syncHistoryWithStore from 'react-router-redux/lib/sync';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import './main.less';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

injectTapEventPlugin();
render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);

