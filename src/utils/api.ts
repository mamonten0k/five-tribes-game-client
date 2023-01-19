import axios from 'axios';
import { CreateUserParams, User, UserCredentialsParams } from './types';

const API_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({ baseURL: API_URL });
const config = { withCredentials: true };

export const signUp = (data: CreateUserParams) => {
  return axiosClient.post('/auth/register', data, config);
};

export const signIn = (data: UserCredentialsParams) => {
  return axiosClient.post('/auth/login', data, config);
};

export const getAuthUser = () => {
  return axiosClient.get<User>('/auth/status', config);
};
