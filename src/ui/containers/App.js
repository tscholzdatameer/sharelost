import React, { Component, PropTypes } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

App.path = '/';

export default App;
