import React, { Component, PropTypes } from 'react';
import connect from 'react-redux/lib/components/connect';
import Link from 'react-router/lib/Link';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import { toggleDrawer } from '../actions';

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  handleMenuClick(event, child) {
    const { router } = this.context;
    router.push(child.props.value);
  }

  toggleDrawer() {
    const { dispatch } = this.props;
    dispatch(toggleDrawer());
  }

  getLoginMenuEntry() {
    const { authenticated, user } = this.props;

    if (!authenticated) {
      return <FlatButton label="Login" containerElement={ <Link to="/login" /> } />;
    }

    return (
      <IconMenu
        iconButtonElement={
          <FlatButton
            label={user.get('name')}
            labelPosition="before"
            icon={<FontIcon className="material-icons">expand_more</FontIcon>}
          />
        }
        onItemTouchTap={ this.handleMenuClick }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Add Item" value="/items/add" />
        <MenuItem primaryText="My Items" value={`/items/by/userId/${user.id}/0/20/desc`} />
        <Divider />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" value="/logout" />
      </IconMenu>
    );
  }

  render() {
    const { authenticated } = this.props;
    return (
      <AppBar
        style={{ 'position': 'fixed' }}
        title="ShareLost"
        showMenuIconButton={ authenticated }
        onLeftIconButtonTouchTap={this.toggleDrawer}
        iconElementRight={ this.getLoginMenuEntry() }
      />
    );
  }
}

MainMenu.contextTypes = {
  router: PropTypes.object
};

MainMenu.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { auth: { authenticated, user } } = state;
  return {
    authenticated,
    user
  };
}

export default connect(mapStateToProps)(MainMenu);
