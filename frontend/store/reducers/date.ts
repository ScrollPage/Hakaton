import Cookie from 'js-cookie';
import { PropertiesType } from '@/types/action';
import * as actions from './../actions/date';

const initialState = {
  date: Cookie.get('date') === undefined ? new Date("2052-01-01") : new Date(Cookie.get('date') as any),
};

type InititalStateType = typeof initialState;

type DateActionsTypes = ReturnType<PropertiesType<typeof actions>>

export const dateReducer = (state = initialState, action: DateActionsTypes): InititalStateType => {
  switch (action.type) {
    case 'NEXT_DATE':
      {
        let newDate = new Date(state.date);
        newDate.setDate(newDate.getDate() + 1);
        return { ...state, date: newDate }
      }
    default:
      return state;
  }
}