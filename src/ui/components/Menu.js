import React, { Component } from 'react';
import { Header, Navigation } from 'react-mdl/lib/Layout';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header title="ShareLost">
        <Navigation>
          <a href="#">Login</a>
        </Navigation>
      </Header>
    );
  }
}

export default Menu;
