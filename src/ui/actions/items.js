import {Item} from '../utils';

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

export const REQUEST_ITEMS_BY_CATEGORY = 'REQUEST_ITEMS_BY_CATEGORY';
export const RECEIVE_ITEMS_BY_CATEGORY = 'RECEIVE_ITEMS_BY_CATEGORY';

function requestItemsByCategory() {
  return {
    type: REQUEST_ITEMS_BY_CATEGORY
  };
}

function receiveItemsByCategory(items) {
  return {
    type: RECEIVE_ITEMS_BY_CATEGORY,
    items
  };
}

export function fetchItemsByCategory(options = { page: 0, size: 20, sort: 'desc'}) {
  const { page, size, sort, additional } = options;
  let findQuery;
  switch (options.category) {
    case 'value':
      findQuery = 'findByOrderByValueDesc';
      break;
    case 'date':
      findQuery = 'findByOrderByPublishDateDesc';
      break;
    case 'userId':
      findQuery = 'findByUserId';
      options = Object.assign(
        {},
        {
          page,
          size,
          sort,
          userId: additional
        }
      );
      break;
    default:
      findQuery = 'findByOrderByPublishDateDesc';
  }

  return dispatch => {
    dispatch(requestItemsByCategory());
    Item.search(findQuery, options)
      .then(items => dispatch(receiveItemsByCategory(items)));
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

