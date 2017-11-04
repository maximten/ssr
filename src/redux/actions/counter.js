import Types from '../constants/types';

export const setCounter = (counter) => ({
  type: Types.SET_COUNTER,
  counter,
});
