import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardMedia, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

class ItemCardSmall extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.toggleExpandReduce = this.toggleExpandReduce.bind(this);
  }

  toggleExpandReduce() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { item, onShowDetailClick} = this.props;
    return (
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
          <Card key={item.id} className="item-card" expanded={ this.state.expanded } >
            <CardHeader
              title={ 'Value: ' + item.get('value') + '%' }
            />
            <CardMedia overlay={<CardTitle title={item.get('name')} />} style={{ minHeight: '269px' }}>
              <img src={ item.get('imagePaths') } />
            </CardMedia>
            <CardActions>
              <FlatButton label="Details" onTouchTap={() => onShowDetailClick(item.id)} />
              <IconButton
                style={{ float: 'right' }}
                onTouchTap={ this.toggleExpandReduce }
              >
                <FontIcon className="material-icons">{ this.state.expanded ? 'expand_less' : 'expand_more' }</FontIcon>
              </IconButton>
            </CardActions>
            <CardText expandable={ true }>
              <p>{item.get('description') }</p>
              Category: { item.get('category') }<br />
              Quality: { item.get('quality') }<br />
              Org. Price: { item.get('orgPrice') }<br />
              Would Pay: { item.get('willingToPay') }
            </CardText>
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
