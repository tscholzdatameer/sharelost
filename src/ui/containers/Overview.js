import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import Grid, { Cell } from 'react-mdl/lib/Grid';

import { fetchTopItems } from '../actions';

function renderItem(item) {
  return (
      <Cell col={4} key={item.id}>
        <Card shadow={1} key={item.id} style={{width: '320px', height: '320px', margin: 'auto'}}>
          <CardTitle style={{ background: `url(https://unsplash.it/320/220?image=${item.id}) no-repeat center/cover` }} expand>{item.get('name')}</CardTitle>
          <CardText>
            {item.get('description') }
          </CardText>
          <CardActions border>
            <Link to={`/detail/${ item.id }`}>Show me</Link>
          </CardActions>
        </Card>
      </Cell>
    );
}

class Overview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTopItems());
  }

  render() {
    const { items } = this.props;
    return (
        <Grid>
          { items.map(item => renderItem(item)) }
        </Grid>
      );
  }
}

Overview.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { topItems: { isFetching, items } } = state;
  return {
    isFetching,
    items
  };
}

export default connect(mapStateToProps)(Overview);

