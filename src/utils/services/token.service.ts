export const setToken = (tk: string) => {
  localStorage.setItem('userTK', tk);
};

export const updateToken = (tk: string) => {
  localStorage.setItem('userTK', tk);
};

export const clearToken = () => {
  localStorage.removeItem('userTK');
};

export const getToken = () => {
  return localStorage.getItem('userTK');
};
