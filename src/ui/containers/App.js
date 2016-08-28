import React, { Component, PropTypes } from 'react';
import connect from 'react-redux/lib/components/connect';
import filter from 'lodash/filter';
import Menu from '../components/Menu';
import AppDrawer from '../components/AppDrawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, isFetching } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <Menu />
          { isFetching ? <LinearProgress mode="indeterminate" max={100} min={0} style={{ position: 'absolute', zIndex: 1101}} color="#3F51B5" /> : null }
          <AppDrawer />
          <div className="container-fluid">
            {children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  isFetching: PropTypes.bool.isRequired
};

App.path = '/';

function mapStateToProps(state) {
  const isFetching = filter(state, 'isFetching');
  return {
    isFetching: isFetching.length > 0
  };
}

export default connect(mapStateToProps)(App);
