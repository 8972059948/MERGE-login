export const getAccessToken = () =>
  window.localStorage.getItem(type.default.ACCESS_TOKEN);

export const setAccessToken = token =>
  window.localStorage.setItem(type.default.ACCESS_TOKEN, token);

export const clearToken = () => window.localStorage.clear();

export const logout = () => {
  window.localStorage.clear();
  fetch('http://localhost:4005/graphql', {
    method: 'POST',
  })
    .then(response => {
      return response.json();
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => console.log(error));
};

