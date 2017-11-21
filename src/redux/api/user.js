import fetch from 'isomorphic-fetch';

export const register = (formData) => {
  let status;
  return fetch(`/api/v1/user/register/`, {
    method: 'post',
    body: formData,
    credentials: 'same-origin'
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

export const login = (formData) => {
  let status;
  return fetch(`/api/v1/user/login`, {
    method: 'post',
    body: formData,
    credentials: 'same-origin'
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

export const logout = () => {
  let status;
  return fetch(`/api/v1/user/logout`, {
    method: 'get',
    credentials: 'same-origin'
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