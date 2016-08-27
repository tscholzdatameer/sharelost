import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
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
          <IconButton><FontIcon className="material-icons">more_vert</FontIcon></IconButton>
        }
        onItemTouchTap={ this.handleMenuClick }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Add Item" value="/items/add" />
        <MenuItem primaryText="My Items" value={`/items/by/userId/${user.id}/0/20/desc`} />
        <MenuItem primaryText="Top Items" value="/items/by/value/0/20/desc" />
        <MenuItem primaryText="Latest Items" value="/items/by/date/0/20/desc" />
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
