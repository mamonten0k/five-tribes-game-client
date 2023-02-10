export const setToken = (tk: string) => {
  localStorage.setItem('userTK', tk);
};

export const setUser = (un: string) => {
  localStorage.setItem('user', un);
};

export const updateToken = (tk: string) => {
  localStorage.setItem('userTK', tk);
};

export const removeToken = () => {
  localStorage.removeItem('userTK');
  localStorage.clear();
};

export const getToken = () => {
  return localStorage.getItem('userTK');
};

export const getUser = () => {
  return localStorage.getItem('user');
};
