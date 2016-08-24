import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { validateAddItemForm } from '../actions';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  }
};

class ItemAdd extends Component {
  static getPath() {
    return '/items/add';
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  getErrorTextFor(elementReference) {
    const { formData } = this.props;

    if(!formData[elementReference]) {
      return '';
    }

    return formData[elementReference].errorText || '';
  }

  handleSubmit() {
    const { dispatch } = this.props;
    dispatch(validateAddItemForm(this.refs));
  }

  render() {
    return (
      <div className="row center-xs">
        <Card className="col-xs-12 col-md-6 col-lg-6 form-card">
          <CardHeader title="Add Item" />
          <CardText>
            <TextField
              fullWidth={true}
              floatingLabelText="Name"
              ref="name"
              autoComplete="off"
              errorText={ this.getErrorTextFor('name') }
              required
            />
            <TextField
              fullWidth={true}
              floatingLabelText="Description"
              multiLine={true}
              rows={2}
              ref="description"
              autoComplete="off"
              errorText={ this.getErrorTextFor('description') }
              required
            />
            <FlatButton label="Choose an Image" labelPosition="before">
              <input type="file" style={styles.imageInput} />
            </FlatButton>
          </CardText>
          <CardActions>
            <RaisedButton label="Add Item" secondary={true} onTouchTap={this.handleSubmit} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

ItemAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  isValid: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { addItemForm: { formData, isValid } } = state;
  return {
    formData,
    isValid
  };
}

export default connect(mapStateToProps)(ItemAdd);
