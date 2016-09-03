import { TOGGLE_DRAWER } from '../actions';

export function drawer(state = { isOpen: false }, action) {
  switch(action.type) {
    case TOGGLE_DRAWER:
      return Object.assign(
        {},
        state,
        { isOpen: !state.isOpen }
      );
    default:
      return state;
  }
}

