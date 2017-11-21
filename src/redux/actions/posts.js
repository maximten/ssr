import Types from '../constants/types';

export const fetchPosts = (limit, skip) => {
  return {
  type: Types.FETCH_POSTS.REQUEST,
  limit,
  skip
}};

export const fetchPost = (slug) => ({
  type: Types.FETCH_POST.REQUEST,
  slug,
});
