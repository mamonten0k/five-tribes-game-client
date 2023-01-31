import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootAPI } from '../utils/api';

export const store = configureStore({
  reducer: {
    [rootAPI.reducerPath]: rootAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([rootAPI.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
