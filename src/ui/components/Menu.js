import React, { Component } from 'react';
import { Link } from 'react-router';
import { Header, Navigation } from 'react-mdl/lib/Layout';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header title="ShareLost">
        <Navigation>
          <Link to="/login">Login</Link>
        </Navigation>
      </Header>
    );
  }
}

export default Menu;
