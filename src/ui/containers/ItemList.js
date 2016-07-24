import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Grid from 'react-mdl/lib/Grid';

import ItemCardSmall from '../components/ItemCardSmall';
import { fetchItemsByCategory } from '../actions';

class ItemList extends Component {
  static getPath() {
    return '/items/by/:category';
  }

  constructor(props) {
    super(props);
    this.navigateToDetail = this.navigateToDetail.bind(this);
  }

  componentWillMount() {
    const { dispatch, params} = this.props;
    dispatch(fetchItemsByCategory(params.category));
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props;
    const nextParams = nextProps.params;

    if (params.category !== nextParams.category) {
      dispatch(fetchItemsByCategory(nextParams.category));
    }
  }

  navigateToDetail(id) {
    this.context.router.push(`/item/${id}`);
  }

  render() {
    const { items } = this.props;
    return (
        <div>
          <Grid>
            { items.map(item => <ItemCardSmall item={item} key={item.id} onShowDetailClick={ this.navigateToDetail }/>) }
          </Grid>
      </div>
    );
  }
}

ItemList.contextTypes = {
  router: PropTypes.object
};

ItemList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { itemsByCategory: { isFetching, items } } = state;
  return {
    isFetching,
    items
  };
}

export default connect(mapStateToProps)(ItemList);
