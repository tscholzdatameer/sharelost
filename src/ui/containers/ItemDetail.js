import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Grid, { Cell } from 'react-mdl/lib/Grid';

import { fetchItem } from '../actions';

class ItemDetail extends Component {
  static getPath() {
    return '/item/:id';
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(fetchItem(params.id));
  }

  render() {
    const { item } = this.props;
    return (
        <Grid>
          <Cell offset={1} col={10}>
            { (() => {
              if (item) {
                return (
                  <div>
                    <h1>{ item.get('name') } </h1>
                    <img src={ `https://unsplash.it/200/300?image=${item.id}` } />
                  </div>
                );
              }
              return <p>nothing</p>;
            })()}
          </Cell>
        </Grid>
      );
  }
}

ItemDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { selectedItem: { isFetching, item } } = state;
  return {
    isFetching,
    item
  };
}

export default connect(mapStateToProps)(ItemDetail);
