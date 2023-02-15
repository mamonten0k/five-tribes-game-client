import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { rootAPI } from '../utils/api';

import gameMiddleware from './game/game.middleware';
import { gameReducer } from './game/game.slice';
import { socketActionTypes, socketReducer } from './socket/socket.slice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    socket: socketReducer,
    [rootAPI.reducerPath]: rootAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          socketActionTypes.SET_SOCKET,
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat([rootAPI.middleware, gameMiddleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
