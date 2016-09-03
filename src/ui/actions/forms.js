import reduce from 'lodash/reduce';
import filter from 'lodash/filter';

export const ITEM_FORM_ERROR = 'ITEM_FORM_ERROR';
export const ITEM_FORM_SUCCESS = 'ITEM_FORM_SUCCESS';

function validateForm(formData) {
  return reduce(formData, (result, element, referenceName) => {
    const value = element.getValue();
    const { required } = element.props;
    result[referenceName] = {
      value
    };

    if(required && value === '') {
      result[referenceName].errorText = 'Field is required';
    }

    return result;
  }, {});
}

export function validateAddItemForm(orgFormData) {
  return dispatch => {
    const formData = validateForm(orgFormData);
    const hasErrors = filter(formData, 'errorText').length > 0;
    const type = hasErrors ? ITEM_FORM_ERROR : ITEM_FORM_SUCCESS;

    dispatch({
      type,
      formData
    });
  };
}
