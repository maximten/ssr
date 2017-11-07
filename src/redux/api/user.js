import fetch from 'isomorphic-fetch';

export const register = (formData) => {
  return fetch(`/api/v1/user/register/`, {
    method: 'post',
    body: formData
  })
  .then(response => response.json())
  .then(json => json);
}

export const login = (formData) => {
  return fetch(`/api/v1/user/login`, {
    method: 'post',
    body: formData
  })
  .then(response => response.json())
  .then(json => json);
}