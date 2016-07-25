import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions';
import { Link, withRouter } from 'react-router';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { authenticated, router } = nextProps;

    if(authenticated) {
      router.replace('/top-items');
    }
  }

  handleRegister() {
    const { name, email, password } = this.refs;
    const { dispatch } = this.props;

    dispatch(register({
      email: email.input.value,
      name: name.input.value,
      password: password.input.value
    }));
  }

  render() {
    return (
      <div className="row center-xs">
        <Card className="col-xs-12 col-md-4 col-lg-4 form-card">
          <CardHeader title="Login" />
          <CardText>
            <TextField fullWidth={true} floatingLabelText="Name" ref="name" required/>
            <TextField fullWidth={true} floatingLabelText="Email" ref="email" autoComplete="off"/>
            <TextField fullWidth={true} floatingLabelText="Password" ref="password" type="password" autoComplete="off"/>
          </CardText>
          <CardActions>
            <RaisedButton label="Register" secondary={true} onTouchTap={this.handleRegister} />
            <span>Already a member? <Link to="/login">Login</Link></span>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Register.path = '/register';

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { auth: { authenticated } } = state;
  return {
    authenticated
  };
}

export default connect(mapStateToProps)(withRouter(Register));

