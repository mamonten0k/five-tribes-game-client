import { CreateUserParams, User, UserCredentialsParams } from './types';

import axios from 'axios';
import * as tokenAPI from './services/token.service';

const axiosClient = axios.create({ baseURL: process.env.REACT_APP_API_URL });

axiosClient.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${tokenAPI.getToken()}`;
  return config;
});

const config = {
  withCredentials: true,
};

export const signUp = async (params: CreateUserParams) => {
  const { data } = await axiosClient.post('/auth/register', params, config);
  tokenAPI.setToken(data.token);
};

export const signIn = async (params: UserCredentialsParams) => {
  const { data } = await axiosClient.post('/auth/login', params, config);
  tokenAPI.setToken(data.token);
};

export const getAuthUser = () => {
  return axiosClient.get<User>('/auth/status', config);
};
