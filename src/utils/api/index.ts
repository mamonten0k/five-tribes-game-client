import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: 'include',
  }),
  endpoints: () => ({}),
});
