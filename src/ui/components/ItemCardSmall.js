import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class ItemCardSmall extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, onShowDetailClick } = this.props;
    return (
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
          <Card key={item.id} className="item-card">
            <CardMedia overlay={<CardTitle title={item.get('name')} />} >
              <img src={ `https://unsplash.it/320/220?image=${item.id}`} />
            </CardMedia>
            <CardText className="item-card__description--size-small">
                {item.get('description') }
            </CardText>
            <CardActions>
              Category: { item.get('category') }
              <FlatButton label="Show" onTouchTap={() => onShowDetailClick(item.id)} />
            </CardActions>
          </Card>
        </div>
      );
  }
}

ItemCardSmall.propTypes = {
  'item': PropTypes.object.isRequired,
  'onShowDetailClick': PropTypes.func.isRequired
};

export default ItemCardSmall;
