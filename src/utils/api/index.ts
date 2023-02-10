import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import * as tokenAPI from '../../utils/services/token.service';

export const rootAPI = createApi({
  reducerPath: 'api',
  tagTypes: ['Games'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: 'include',
    headers: {
      authorization: `Bearer ${tokenAPI.getToken()}`,
    },
  }),
  endpoints: () => ({}),
});
