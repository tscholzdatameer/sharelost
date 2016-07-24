import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Header, Navigation } from 'react-mdl/lib/Layout';
import Menu, { MenuItem } from 'react-mdl/lib/Menu';
import IconButton from 'react-mdl/lib/IconButton';
import map from 'lodash/map';

const LINKS = {
  'Items By Value': '/items/by/value',
  'Items By Date': '/items/by/date'
};

class MainMenu extends Component {
  constructor(props) {
    super(props);
  }

  getLoginMenuEntry() {
    const { authenticated } = this.props;

    if (!authenticated) {
      return <Link to="/login">Login</Link>;
    }

    return (
      <div>
        <IconButton name="more_vert" id="menu_dropdown" />
        <Menu target="menu_dropdown" align="right">
          <MenuItem><Link to="/logout">Logout</Link></MenuItem>
        </Menu>
      </div>
    );
  }

  getLinks() {
    const { authenticated } = this.props;

    if (!authenticated) {
      return null;
    }

    return map(LINKS, (link, label) => <Link to={link} key={link}>{ label }</Link>);
  }

  render() {
    return (
      <Header title="ShareLost">
        <Navigation>
          { this.getLinks() }
          { this.getLoginMenuEntry() }
        </Navigation>
      </Header>
    );
  }
}

MainMenu.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { auth: { authenticated, user } } = state;
  return {
    authenticated,
    user
  };
}

export default connect(mapStateToProps)(MainMenu);
