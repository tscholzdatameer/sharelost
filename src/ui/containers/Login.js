import React, { Component, PropTypes } from 'react';
import connect from 'react-redux/lib/components/connect';
import Link from 'react-router/lib/Link';
import withRouter from 'react-router/lib/withRouter';
import { getToken } from '../actions';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { authenticated, location, router } = nextProps;

    if(authenticated) {
      if (location.state && location.state.nextPathname) {
        router.replace(location.state.nextPathname);
      } else {
        router.replace('/items/by/value/0/20/desc');
      }
    }

  }

  handleSubmit() {
    const { email, pass } = this.refs;
    const { dispatch } = this.props;

    dispatch(getToken(email.input.value, pass.input.value));
  }

  render() {

    return (
      <div className="row center-xs">
        <Card className="col-xs-12 col-md-4 col-lg-4 form-card">
          <CardHeader title="Login" />
          <CardText>
            <TextField fullWidth={true} floatingLabelText="Email" ref="email" autoComplete="off"/>
            <TextField fullWidth={true} floatingLabelText="Password" ref="pass" type="password" autoComplete="off"/>
          </CardText>
          <CardActions>
            <RaisedButton label="Login" secondary={true} onTouchTap={this.handleSubmit} />
            <span>Not a member? Register <Link to="/register">here</Link>.</span>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Login.path = '/login';

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { auth: { authenticated } } = state;
  return {
    authenticated
  };
}

export default connect(mapStateToProps)(withRouter(Login));

