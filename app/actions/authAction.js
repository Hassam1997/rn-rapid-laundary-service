import { AUTH } from './constant';

export const login = payload => ({
  type: AUTH.LOGIN_USER,
  payload
});

export const validateLogin = () => ({
  type: AUTH.LOGIN_VALID
});

export const authUser = payload => ({
  type: AUTH.USER,
  payload
});

export const logout = () => ({
  type: AUTH.LOGOUT_USER
});

export const update = payload => ({
  type: AUTH.UPDATE_USER,
  payload
});

