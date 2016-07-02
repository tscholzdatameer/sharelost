import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchItem } from '../actions';

class ItemDetail extends Component {
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
                  <img src={ `https://unsplash.it/200/300?image=${item.id}` } />
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

ItemDetail.path = '/detail/:id';

function mapStateToProps(state) {
  const { selectedItem: { isFetching, item } } = state;
  return {
    isFetching,
    item
  };
}

export default connect(mapStateToProps)(ItemDetail);

