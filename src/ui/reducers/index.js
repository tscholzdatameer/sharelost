import * as userReducer from './user';
import * as itemsReducer from './items';
import * as commonReducer from './common';
import { routerReducer as routing } from 'react-router-redux/lib/reducer';
import combineReducers from 'redux/lib/combineReducers';

const rootReducer = combineReducers(
    Object.assign(
      {},
      userReducer,
      itemsReducer,
      commonReducer,
      { routing }
    )
);

export default rootReducer;
