import { rootAPI } from '.';
import { UserCredentialsParams, AuthenticationResponse } from '../types';

import * as tokenAPI from '../services/token.service';

const authAPI = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthenticationResponse, UserCredentialsParams>({
      query: (userCredentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: userCredentials,
      }),
      async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved }) {
        try {
          const { data } = await cacheDataLoaded;
          tokenAPI.setToken(data.token);
        } finally {
          await cacheEntryRemoved;
        }
      },
    }),
    signUp: builder.mutation<AuthenticationResponse, UserCredentialsParams>({
      query: (userCredentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: userCredentials,
      }),
    }),
    getStatus: builder.query<void, void>({
      // Добавить удалние токена если пробросило ошибку
      query: () => ({
        url: 'auth/status',
        method: 'GET',
        headers: {
          authorization: `Bearer ${tokenAPI.getToken()}`,
        },
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useGetStatusQuery } = authAPI;
