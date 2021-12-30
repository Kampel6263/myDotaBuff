import { combineReducers } from 'redux';
import { general } from '../store/general';
// import { AUIReducer } from '../store/aui';

export const rootReducer = combineReducers({
  general,
//   aui: AUIReducer
});

export type State = ReturnType<typeof rootReducer>;