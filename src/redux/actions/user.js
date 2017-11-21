import Types from '../constants/types';

export const register = (formData) => ({
  type: Types.USER_REGISTER.REQUEST,
  formData,
});

export const login = (formData) => ({
  type: Types.USER_LOGIN.REQUEST,
  formData
});

export const logout = () => ({
  type: Types.USER_LOGOUT.REQUEST
});
