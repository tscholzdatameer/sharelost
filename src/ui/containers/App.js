import React, { Component, PropTypes } from 'react';
import Menu from '../components/Menu';
import { Layout, Content } from 'react-mdl/lib/Layout';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <Layout>
        <Menu/>
        <Content>
          {children}
        </Content>
      </Layout>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

App.path = '/';

export default App;
