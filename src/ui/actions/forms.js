import reduce from 'lodash/reduce';
import filter from 'lodash/filter';

export const ITEM_FORM_ERROR = 'ITEM_FORM_ERROR';
export const ITEM_FORM_SUCCESS = 'ITEM_FORM_SUCCESS';

function validateForm(formData) {
  return new Promise((resolve, reject) => {
    const validatedFormData = reduce(formData, (result, element, referenceName) => {
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

    const fieldsWithError = filter(validatedFormData, 'errorText');

    if (fieldsWithError.length > 0) {
      reject(validatedFormData);
    } else {
      resolve(validatedFormData);
    }
  });
}

export function validateAddItemForm(formData) {
  return dispatch => {
    validateForm(formData)
      .then(
          (formData) => dispatch({
            type: ITEM_FORM_SUCCESS,
            formData
          }),
          (formData) => dispatch({
            type: ITEM_FORM_ERROR,
            formData
          })
      );
  };
}
