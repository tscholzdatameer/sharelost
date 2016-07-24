import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions';
import { Link, withRouter } from 'react-router';
import Grid, { Cell } from 'react-mdl/lib/Grid';
import { Card, CardTitle, CardActions } from 'react-mdl/lib/Card';
import TextField from 'react-mdl/lib/Textfield';
import Button from 'react-mdl/lib/Button';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { authenticated, router } = nextProps;

    if(authenticated) {
      router.replace('/top-items');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, email, password } = this.refs;
    const { dispatch } = this.props;

    dispatch(register({
      email: email.refs.input.value,
      name: name.refs.input.value,
      password: password.refs.input.value
    }));
  }

  render() {
    return (
      <form autoComplete="off" onSubmit={ this.handleSubmit }>
        <Grid>
          <Cell col={4} offset={4} >
            <Card shadow={1} style={{ width: '100%' }}>
              <CardTitle>
                <Grid>
                    <TextField label="Name" ref="name" floatingLabel required/>
                    <TextField label="Email" ref="email" floatingLabel required />
                    <TextField label="Password" ref="password" type="password" floatingLabel required/>
                </Grid>
              </CardTitle>
              <CardActions>
                  <Button colored >Register</Button>
              </CardActions>
            </Card>
          </Cell>
        </Grid>
        <Grid>
          <Cell col={4} offset={4}>
            Already a member? Login <Link to="/login">here</Link>.
          </Cell>
        </Grid>
      </form>
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

