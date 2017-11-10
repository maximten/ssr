import fetch from 'isomorphic-fetch';

export const register = (formData) => {
  return fetch(`/api/v1/user/register/`, {
    method: 'post',
    body: formData
  })
  .then(response => {
    if (response.status == 200) {
      response.json()
    } else {
      throw response.json();
    }
  });
}

export const login = (formData) => {
  let status;
  return fetch(`/api/v1/user/login`, {
    method: 'post',
    body: formData
  })
  .then(response => {
    status = response.status;
    return response.json();
  })
  .then(json => {
    if (status == 200) {
      return json;
    } else {
      throw json;
    }
  });
}