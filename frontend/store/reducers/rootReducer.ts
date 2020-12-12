import { modalReducer } from './modal';
import { combineReducers } from 'redux';
import { alertReducer } from './alert';
import { dateReducer } from './date';

export let rootReducer = combineReducers({
  alert: alertReducer,
  modal: modalReducer,
  date: dateReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;


