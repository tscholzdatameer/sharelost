import React, { Component, PropTypes } from 'react';
import connect from 'react-redux/lib/components/connect';

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
        <div>
            { (() => {
              if (item) {
                return (
                  <div>
                    <h1>{ item.get('name') } </h1>
                    <img src={ item.get('imagePaths') } />
                  </div>
                );
              }
              return <p>nothing</p>;
            })()}
        </div>
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
