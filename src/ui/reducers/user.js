import { REQUEST_REGISTRATION, RECEIVE_REGISTRATION, REQUEST_TOKEN, RECEIVE_TOKEN } from '../actions';

export function auth(state = { token: null, authenticated: false, timestamp: new Date().getTime(), user: {} }, action) {
  switch (action.type) {
    case RECEIVE_TOKEN:
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
    case REQUEST_TOKEN:
    case REQUEST_REGISTRATION:
    case RECEIVE_REGISTRATION:
    default:
      return state;
  }
}

