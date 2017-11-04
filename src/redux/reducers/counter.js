import Types from '../constants/types';

const initialState = {
  counter: 0,
};

const counter = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_COUNTER:
      return {
        ...state,
        counter: action.counter
      };
    default:
      return {
        ...state
      };
  };
};

export default counter;