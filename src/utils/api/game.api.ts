import { rootAPI } from '.';

import * as tokenAPI from '../services/token.service';

const authAPI = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    findGame: builder.mutation<any, void>({
      query: () => ({
        url: 'game/status',
        method: 'POST',
        headers: {
          authorization: `Bearer ${tokenAPI.getToken()}`,
        },
        body: { token: tokenAPI.getToken() },
      }),
    }),
  }),
});

export const { useFindGameMutation } = authAPI;
