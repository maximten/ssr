import fetch from 'isomorphic-fetch';

export const list = (limit, skip) => fetch(`/api/v1/posts/?limit=${limit}&skip=${skip}`)
  .then(response => response.json())
  .then(json => json);

export const getBySlug = slug => fetch(`/api/v1/posts/?slug=${slug}`)
  .then(response => response.json())
  .then(json => json);
