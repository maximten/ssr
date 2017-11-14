import Types from '../constants/types';

const initialState = {
  user: null,
  loading: false,
  registerSuccess: null,
  loginSuccess: null,
  registerError: null,
  loginError: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_REGISTER.REQUEST:
      return {
        ...state,
        loading: true
      };
    case Types.USER_REGISTER.SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
        registerSuccess: true,
        registerError: null
      };
    case Types.USER_REGISTER.FAILURE:
      return {
        ...state,
        registerError: action.error,
        loading: false
      };
    case Types.USER_LOGIN.REQUEST:
      return {
        ...state,
        loading: true
      };
    case Types.USER_LOGIN.SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
        loginSuccess: true,
        loginError: null
      };
    case Types.USER_LOGIN.FAILURE:
      return {
        ...state,
        loginError: action.error,
        loading: false
      };
    default:
      return {
        ...state
      };
  };
};

export default user;