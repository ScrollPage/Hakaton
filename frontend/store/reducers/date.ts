import Cookie from 'js-cookie';
import { PropertiesType } from '@/types/action';
import * as actions from './../actions/date';

const patch = [
  "2052-01-01",
  "2052-03-31",
  "2052-06-30",
  "2052-09-30",
  "2052-12-31",
  "2053-03-31",
  "2053-06-30",
  "2053-09-30",
  "2053-12-31",
  "2054-03-31",
  "2054-06-30",
  "2054-09-30",
  "2054-12-31",
];

const initialState = {
  date: Cookie.get('date') === undefined ? new Date("2052-01-02") : new Date(Cookie.get('date') as any),
  begin: Cookie.get('begin') === undefined ? new Date("2052-01-01") : new Date(Cookie.get('begin') as any),
};

type InititalStateType = typeof initialState;

type DateActionsTypes = ReturnType<PropertiesType<typeof actions>>

export const dateReducer = (state = initialState, action: DateActionsTypes): InititalStateType => {
  switch (action.type) {
    case 'NEXT_DATE':
      {
        let newDate = new Date(state.date);
        let begin = state.begin;
        newDate.setDate(newDate.getDate() + 1);
        patch.forEach(item => {
          if (new Date(item) < state.date) {
            begin = new Date(item);
          }
        })
        return { ...state, date: newDate, begin }
      }
    default:
      return state;
  }
}