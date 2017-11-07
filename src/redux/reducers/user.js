import Types from '../constants/types';

const initialState = {
  user: null,
  loading: false,
  error: null
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
        loading: false
      };
    case Types.USER_REGISTER.FAILURE:
      return {
        ...state,
        error: action.error,
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
        loading: false
      };
    case Types.USER_LOGIN.FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return {
        ...state
      };
  };
};

export default user;