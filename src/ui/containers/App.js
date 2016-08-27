import React, { Component, PropTypes } from 'react';
import Menu from '../components/Menu';
import AppDrawer from '../components/AppDrawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <Menu />
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
  children: PropTypes.node
};

App.path = '/';

export default App;
