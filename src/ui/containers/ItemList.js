import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import ItemCardSmall from '../components/ItemCardSmall';
import { fetchItemsByCategory } from '../actions';

class ItemList extends Component {
  static getPath() {
    return '/items/by/:category(/:additional)/:page/:size/:sort';
  }

  constructor(props) {
    super(props);
    this.navigateToDetail = this.navigateToDetail.bind(this);
  }

  componentWillMount() {
    const { dispatch, params} = this.props;
    dispatch(fetchItemsByCategory(params));
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props;
    const nextParams = nextProps.params;

    if (!isEqual(params, nextParams)) {
      dispatch(fetchItemsByCategory(nextParams));
    }
  }

  navigateToDetail(id) {
    this.context.router.push(`/item/${id}`);
  }

  render() {
    const { items } = this.props;
    return (
      <div className="row">
        { items.map(item => <ItemCardSmall item={item} key={item.id} onShowDetailClick={ this.navigateToDetail }/>) }
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
