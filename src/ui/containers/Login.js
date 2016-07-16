import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getToken } from '../actions';
import { Card, CardTitle, CardActions } from 'react-mdl/lib/Card';
import Grid, { Cell } from 'react-mdl/lib/Grid';
import TextField from 'react-mdl/lib/Textfield';
import Button from 'react-mdl/lib/Button';

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
        router.replace('/');
      }
    }

  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, pass } = this.refs;
    const { dispatch } = this.props;

    dispatch(getToken(email.value, pass.value));
  }

  render() {

    return (
      <form autoComplete="off" onSubmit={ this.handleSubmit }>
        <Grid>
          <Cell col={4} offset={4} >
            <Card shadow={1} style={{ width: '100%' }}>
              <CardTitle>
                <Grid>
                    <TextField label="Email" ref="email" floatingLabel autoComplete="share-lost-email"/>
                    <TextField label="Password" ref="pass" type="password" floatingLabel autoComplete="off"/>
                </Grid>
              </CardTitle>
              <CardActions>
                  <Button colored >Login</Button>
              </CardActions>
            </Card>
          </Cell>
        </Grid>
      </form>
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

