import Types from '../constants/types';
import { posts as postsConstants } from '../../constants';

export const initialState = {
  items: [],
  loading: false,
  limit: postsConstants.pageSize,
  skip: 0,
  error: null
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_POSTS.REQUEST:
      return {
        ...state,
        limit: action.limit,
        skip: action.skip,
        loading: true
      };
    case Types.FETCH_POSTS.SUCCESS:
      return {
        ...state,
        items: state.items.concat(action.items),
        loading: false
      };
    case Types.FETCH_POSTS.FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case Types.FETCH_POST.REQUEST:
      return {
        ...state,
        loading: true
      };
    case Types.FETCH_POST.SUCCESS:
      return {
        ...state,
        items: state.items.concat(action.item),
        loading: false
      };
    case Types.FETCH_POST.FAILURE:
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

export default posts;