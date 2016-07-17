import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import { Cell } from 'react-mdl/lib/Grid';
import IconButton from 'react-mdl/lib/IconButton';

class ItemCardSmall extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, onShowDetailClick } = this.props;
    return (
        <Cell col={4}>
          <Card shadow={1} key={item.id} style={{width: '320px', height: '320px', margin: 'auto'}}>
            <CardTitle style={{ background: `url(https://unsplash.it/320/220?image=${item.id}) no-repeat center/cover` }} expand>
              {item.get('name')}
            </CardTitle>
            <CardText>
              {item.get('description') }
            </CardText>
            <CardActions style={{display: 'flex', boxSizing: 'border-box', alignItems: 'center'}}>
              Category: { item.get('category') }
              <div className="mdl-layout-spacer"></div>
              <IconButton name="open_in_new" onClick={ () => onShowDetailClick(item.id) } colored/>
            </CardActions>
          </Card>
        </Cell>
      );
  }
}

ItemCardSmall.propTypes = {
  'item': PropTypes.object.isRequired,
  'onShowDetailClick': PropTypes.func.isRequired
};

export default ItemCardSmall;
