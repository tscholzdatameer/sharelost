export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

export function toggleDrawer() {
  return dispatch => {
    dispatch({ type: TOGGLE_DRAWER });
  };
}
