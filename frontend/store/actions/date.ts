import Cookie from 'js-cookie';
import { ThunkType } from './../../types/thunk';
import { authBuy } from './auth';

export const actions = {
  nextDate: () => ({ type: 'NEXT_DATE' } as const),
  setSubsrc: (days?: number) => ({ type: 'SET_SUBSCR', days: days } as const)
}

export const nextDate = () => ({ type: 'NEXT_DATE' } as const);
export const setSubsrc = (days?: number) => ({ type: 'SET_SUBSCR', days: days } as const);


export const newNextDate = (): ThunkType => async (dispatch: any, getState) => {
  const state = getState();
  dispatch(actions.nextDate());
  if (state.date.subsrc) {
    let newDate = new Date(state.date.date);
    if (newDate > state.date.subsrc) {
      Cookie.remove('subsrc');
      dispatch(actions.setSubsrc(undefined))
      dispatch(authBuy(false));
    }
  }
}





