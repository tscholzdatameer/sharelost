import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { toggleDrawer } from '../actions';

const SelectableList = MakeSelectable(List);

class AppDrawer extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  toggleDrawer() {
    const { dispatch } = this.props;
    dispatch(toggleDrawer());
  }

  handleMenuItemClick(event, value) {
    const { router } = this.context;

    this.toggleDrawer();
    router.push(value);
  }

  render() {
    const { drawer: { isOpen } } = this.props;
    return (
      <Drawer open={isOpen}>
        <AppBar
          title="ShareLost"
          showMenuIconButton={ false }
          zDepth={0}
          iconElementRight={
            <IconButton onTouchTap={ this.toggleDrawer }>
              <FontIcon className="material-icons">clear</FontIcon>
            </IconButton>
          }
        />
        <SelectableList onChange={ this.handleMenuItemClick } value={location.pathname}>
          <ListItem primaryText="Overview" value="/overview" />
          <ListItem primaryText="Latest" value="/items/by/date/0/20/desc" />
          <ListItem primaryText="Top" value="/items/by/value/0/20/desc" />
        </SelectableList>
        <Divider />
      </Drawer>
    );
  }
}

AppDrawer.contextTypes = {
  router: PropTypes.object
};

AppDrawer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  drawer: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { drawer } = state;
  return {
    drawer
  };
}

export default connect(mapStateToProps)(AppDrawer);
