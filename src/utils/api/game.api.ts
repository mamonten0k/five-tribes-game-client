import { rootAPI } from '.';

import { ExitGameParams, FindExistingGamesResponse, FindGameResponse } from '../types';

import * as tokenAPI from '../services/token.service';

const authAPI = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    findGame: builder.mutation<FindGameResponse, void>({
      query: () => ({
        url: 'game/status',
        method: 'POST',
        headers: {
          authorization: `Bearer ${tokenAPI.getToken()}`,
        },
        body: { token: tokenAPI.getToken() },
      }),
    }),
    findExistingGames: builder.query<FindExistingGamesResponse, void>({
      query: () => ({
        url: 'game/existing-games',
        method: 'POST',
        headers: {
          authorization: `Bearer ${tokenAPI.getToken()}`,
        },
        body: { token: tokenAPI.getToken() },
      }),
      providesTags: ['Games'],
    }),
    exitGame: builder.mutation<FindExistingGamesResponse, ExitGameParams>({
      query: (params) => ({
        url: 'game/exit-game',
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${tokenAPI.getToken()}`,
        },
        body: { ...params, token: tokenAPI.getToken() },
      }),
      invalidatesTags: ['Games'],
    }),
  }),
});

export const { useFindGameMutation, useExitGameMutation, useFindExistingGamesQuery } = authAPI;
