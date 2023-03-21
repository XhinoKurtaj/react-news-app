export const isAuthenticated = (token) =>
  localStorage.getItem("token") ? true : false;
