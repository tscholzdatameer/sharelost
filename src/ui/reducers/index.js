import * as ActionTypes from '../actions';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

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

const rootReducer = combineReducers({
  selectedItem,
  topItems,
  allItems,
  routing
});

export default rootReducer;
