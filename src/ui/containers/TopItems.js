import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Grid, { Cell } from 'react-mdl/lib/Grid';
import ItemCardSmall from '../components/ItemCardSmall';
import { fetchTopItems } from '../actions';

class TopItems extends Component {
  constructor(props) {
    super(props);
    this.navigateToDetail = this.navigateToDetail.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTopItems());
  }

  navigateToDetail(id) {
    this.context.router.push(`detail/${id}`);
  }

  render() {
    const { items } = this.props;
    return (
        <div>
          <Grid>
            <Cell col={12}>
              <h3>Top 10 Items by Value</h3>
            </Cell>
          </Grid>
          <Grid>
            { items.map(item => <ItemCardSmall item={item} key={item.id} onShowDetailClick={ this.navigateToDetail }/>) }
          </Grid>
      </div>
      );
  }
}

TopItems.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};

TopItems.contextTypes = {
  router: PropTypes.object
};

TopItems.path = '/top-items';

function mapStateToProps(state) {
  const { topItems: { isFetching, items } } = state;
  return {
    isFetching,
    items
  };
}

export default connect(mapStateToProps)(TopItems);
