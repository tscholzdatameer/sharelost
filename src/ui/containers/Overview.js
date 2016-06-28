import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchTopItems } from '../actions';

function renderItem(item) {
  return (
      <div key={item.id}>
        <h1>{ item.get('name') } <i>Value: { item.get('value') }% </i></h1>
        <p>{ item.get('description') }</p>
        <Link to={`/detail/${ item.id }`}>Show me</Link>
      </div>
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
        <div>
          { items.map(item => renderItem(item)) }
        </div>
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

