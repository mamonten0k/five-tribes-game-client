import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootAPI } from '../utils/api';

import gameSlice from './game/game.slice';

import gameMiddleware from './game/game.middleware';

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    [rootAPI.reducerPath]: rootAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([rootAPI.middleware, gameMiddleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
