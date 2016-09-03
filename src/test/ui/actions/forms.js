import { expect } from 'chai';
import filter from 'lodash/filter';
import { validateAddItemForm, ITEM_FORM_ERROR, ITEM_FORM_SUCCESS } from '../../../ui/actions/forms';

function getFormData(required = false, value = 'test', name = 'Testfield') {
  const formData = {};
  formData[name] = {
    props: {
      required
    },
    getValue: () => value
  };

  return formData;
}

function checkIfResolved(state) {
  const { type, formData } = state;
  const hasError = filter(formData, 'errorText');

  expect(hasError).to.have.lengthOf(0);
  expect(type).to.equal(ITEM_FORM_SUCCESS);
}

function checkIfRejected(state) {
  const { type, formData } = state;
  const hasError = filter(formData, 'errorText');

  expect(hasError).to.have.length.above(0);
  expect(type).to.equal(ITEM_FORM_ERROR);
}

describe('Actions', () => {

  context('forms', () => {

    it('should return a function', () => {
      const action = validateAddItemForm();

      expect(action).to.be.a('function');
    });

    it('should call `dispatch`', () => {
      const action = validateAddItemForm();

      action((state) => expect(state).to.be.an('object'));
    });

    it('should resolve if form field is required and has value', () => {
      const action = validateAddItemForm(getFormData());

      action(checkIfResolved);
    });

    it('should resolve if form field isn`t required and has value', () => {
      const action = validateAddItemForm(getFormData(false));

      action(checkIfResolved);
    });

    it('should resolve if form field isn`t required and has no value', () => {
      const action = validateAddItemForm(getFormData(false, ''));

      action(checkIfResolved);
    });

    it('should reject if form field is required but has no value', () => {
      const action = validateAddItemForm(getFormData(true, ''));

      action(checkIfRejected);
    });
  });

});

