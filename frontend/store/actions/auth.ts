import { instance, instanceWithOutHeaders } from '@/api';
import { ThunkType } from '@/types/thunk';
import Cookie from 'js-cookie';
import { show } from './alert';
import Router from 'next/router';

export const authSignup = (
  email: string,
  firstName: string,
  lastName: string,
  password: string,
): ThunkType => async dispatch => {
  await instanceWithOutHeaders
    .post('/auth/users/ ', {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    })
    .then(() => {
      Router.push({ pathname: '/login' }, undefined, { shallow: true });
      dispatch(show('Вы успешно создали аккаунт! Подтвердите почту и войдите', 'success'));
    })
    .catch(() => {
      Router.push({ pathname: '/register' }, undefined, { shallow: true });
      dispatch(show('Пользователь с такими данными уже существует!', 'warning'));
    });
};

export const emailActivate = (token: string): ThunkType => async dispatch => {
  await instanceWithOutHeaders
    .post('/api/activate/', {
      token,
    })
    .then(() => {
      dispatch(show('Активация прошла успешно!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка активации!', 'warning'));
    });
};

export const authLogin = (email: string, password: string): ThunkType => async dispatch => {
  await instanceWithOutHeaders
    .post('/auth/jwt/create/', {
      email,
      password,
    })
    .then(res => {
      const expirationDate = new Date(new Date().getTime() + 24 * 3600 * 1000);

      Cookie.set('token', res.data.access);
      Cookie.set('expirationDate', expirationDate);

      dispatch(checkAuthTimeout(24 * 3600 * 1000));
      dispatch(authInfo());

      Router.push({ pathname: '/info' }, undefined, { shallow: true });

      dispatch(show('Вы успешно вошли!', 'success'));
    })
    .catch(() => {
      dispatch(show('Неверный логин или пароль, перепроверьте данные!', 'warning'));
    });
};

export const authInfo = (): ThunkType => async dispatch => {
  const token = Cookie.get('token');
  await instance(token)
    .get('/auth/users/me/')
    .then(res => {
      Cookie.set('firstName', res.data.first_name);
      Cookie.set('lastName', res.data.last_name);
      Cookie.set('email', res.data.email);

      console.log('Информация успешно занесена в куки');
    })
    .catch(() => {
      dispatch(show('Ошибка при взятии информации о пользователе!', 'warning'));
    });
};

export const authInfoChange = (firstName: string, lastName: string): ThunkType => async dispatch => {
  const token = Cookie.get('token');
  await instance(token)
    .put('/auth/users/me/', {
      first_name: firstName,
      last_name: lastName
    })
    .then(() => {
      Cookie.set('firstName', firstName);
      Cookie.set('lastName', lastName);

      dispatch(show('Информация успешно изменена!', 'success'));
      Router.push({ pathname: '/secure' }, undefined, { shallow: true });
    })
    .catch(() => {
      dispatch(show('Ошибка при изменении информации!', 'warning'));
    });
};

export const logout = (isRedirect: boolean): ThunkType => () => {
  if (isRedirect) {
    Router.push({ pathname: '/' }, undefined, { shallow: true });
  }
  Cookie.remove('token');
  Cookie.remove('expirationDate');
  Cookie.remove('firstName');
  Cookie.remove('lastName');
  Cookie.remove('email');
};

export const checkAuthTimeout = (expirationTime: number): ThunkType => dispatch =>
  setTimeout(() => dispatch(logout(false)), expirationTime);

export const authCheckState = (): ThunkType => dispatch => {
  const token = Cookie.get('token');

  if (token === undefined) {
    dispatch(logout(false));
  } else {
    const date: any = Cookie.get('expirationDate');
    const expirationDate = new Date(date);

    if (expirationDate <= new Date()) {
      dispatch(logout(false));
    } else {
      dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
    }
  }
};




