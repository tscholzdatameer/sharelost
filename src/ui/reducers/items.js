import * as ActionTypes from '../actions';

export function allItems(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_ITEMS:
      return Object.assign(
          {},
          state,
          { isFetching: true }
      );
    case ActionTypes.RECEIVE_ITEMS:
      return Object.assign(
          {},
          state,
          { isFetching: false, items: action.items }
      );
    default:
      return state;
  }
}

export function itemsByCategory(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_ITEMS_BY_CATEGORY:
      return Object.assign(
          {},
          state,
          { isFetching: true }
      );
    case ActionTypes.RECEIVE_ITEMS_BY_CATEGORY:
      return Object.assign(
          {},
          state,
          { isFetching: false, items: action.items }
      );
    default:
      return state;
  }
}

export function topItems(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_TOP_ITEMS:
      return Object.assign(
          {},
          state,
          { isFetching: true }
      );
    case ActionTypes.RECEIVE_TOP_ITEMS:
      return Object.assign(
          {},
          state,
          { isFetching: false, items: action.items }
      );
    default:
      return state;
  }
}

export function selectedItem(state = { isFetching: false, item: null }, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_ITEM:
      return Object.assign(
          {},
          state,
          { isFetching: true }
      );
    case ActionTypes.RECEIVE_ITEM:
      return Object.assign(
          {},
          state,
          { isFetching: false, item: action.item }
      );
    default:
      return state;
  }
}

export function addItemForm(state = { isValid: false, formData: {} }, action) {
  switch(action.type) {
    case ActionTypes.ITEM_FORM_SUCCESS:
      return Object.assign(
        {},
        state,
        { isValid: true, formData: action.formData }
      );
    case ActionTypes.ITEM_FORM_ERROR:
      return Object.assign(
        {},
        state,
        { isValid: false, formData: action.formData }
      );
    default:
      return state;
  }
}
