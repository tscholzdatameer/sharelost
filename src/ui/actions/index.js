import spring from 'spring-data-rest-js';

spring.requestConfig.baseURL = 'http://localhost:8083';
const Item = spring.extend('items');

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

function requestItems() {
  return {
    type: REQUEST_ITEMS
  };
}

function receiveItems(items) {
  return {
    type: RECEIVE_ITEMS,
    items
  };
}

export function fetchItems() {
  return dispatch => {
    dispatch(requestItems());
    Item.findAll()
      .then(items => dispatch(receiveItems(items)));
  };
}

export const REQUEST_TOP_ITEMS = 'REQUEST_TOP_ITEMS';
export const RECEIVE_TOP_ITEMS = 'RECEIVE_TOP_ITEMS';

function requestTopItems() {
  return {
    type: REQUEST_TOP_ITEMS
  };
}

function receiveTopItems(items) {
  return {
    type: RECEIVE_TOP_ITEMS,
    items
  };
}

export function fetchTopItems() {
  return dispatch => {
    dispatch(requestTopItems());
    Item.search('findTop10ByOrderByValueDesc')
      .then(items => dispatch(receiveTopItems(items)));
  };
}

export const REQUEST_ITEM = 'REQUEST_ITEM';
export const RECEIVE_ITEM = 'RECEIVE_ITEM';

function requestItem() {
  return {
    type: REQUEST_ITEM
  };
}

function receiveItem(item) {
  return {
    type: RECEIVE_ITEM,
    item
  };
}

export function fetchItem(id) {
  return dispatch => {
    dispatch(requestItem());
    Item.findOne(id)
      .then(item => dispatch(receiveItem(item)));
  };
}
