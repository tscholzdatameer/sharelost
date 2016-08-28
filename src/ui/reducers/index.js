import * as ActionTypes from '../actions';
import { routerReducer as routing } from 'react-router-redux/lib/reducer';
import combineReducers from 'redux/lib/combineReducers';

function auth(state = { token: null, authenticated: false, timestamp: new Date().getTime(), user: {} }, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_TOKEN:
      return Object.assign(
          {},
          state,
        {
          token: action.token,
          authenticated: true,
          timestamp: new Date().getTime(),
          user: action.user
        }
      );
    case ActionTypes.REQUEST_TOKEN:
    case ActionTypes.REQUEST_REGISTRATION:
    case ActionTypes.RECEIVE_REGISTRATION:
    default:
      return state;
  }
}

function allItems(state = { isFetching: false, items: [] }, action) {
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

function itemsByCategory(state = { isFetching: false, items: [] }, action) {
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

function topItems(state = { isFetching: false, items: [] }, action) {
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

function selectedItem(state = { isFetching: false, item: null }, action) {
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

function addItemForm(state = { isValid: false, formData: {} }, action) {
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

function drawer(state = { isOpen: false }, action) {
  switch(action.type) {
    case ActionTypes.TOGGLE_DRAWER:
      return Object.assign(
        {},
        state,
        { isOpen: !state.isOpen }
      );
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  selectedItem,
  topItems,
  allItems,
  itemsByCategory,
  auth,
  addItemForm,
  drawer,
  routing
});

export default rootReducer;
