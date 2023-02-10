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
      async onCacheEntryAdded(user, { cacheDataLoaded, cacheEntryRemoved }) {
        try {
          const { data } = await cacheDataLoaded;
          console.log(user);
          tokenAPI.setToken(data.token);
          tokenAPI.setUser(user.username);
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
      async onCacheEntryAdded(user, { cacheDataLoaded, cacheEntryRemoved }) {
        try {
          const { data } = await cacheDataLoaded;
          tokenAPI.setToken(data.token);
          tokenAPI.setUser(user.username);
        } finally {
          await cacheEntryRemoved;
        }
      },
    }),
    getStatus: builder.query<void, void>({
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
