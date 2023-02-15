import { createSlice } from '@reduxjs/toolkit';

import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

export interface GameState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  isLoading: boolean;
  gameId: string | null;
  rival: string | null;
  timestamp: string | null;
}

const initialState: GameState = {
  isEstablishingConnection: false,
  isConnected: false,
  isLoading: false,
  gameId: null,
  rival: null,
  timestamp: null,
};

const gamePersistConfig = {
  key: 'root',
  storage: storageSession,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initiateConnection: (state) => {
      state.isLoading = true;
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    initiateGame: (state, action) => {
      const { gameId, rival, timestamp } = action.payload;
      state.gameId = gameId;
      state.rival = rival;
      state.timestamp = timestamp;
    },
    gameConnected: (state) => {
      state.isLoading = false;
    },
  },
});

export const gameActions = gameSlice.actions;
export const gameReducer = persistReducer(gamePersistConfig, gameSlice.reducer);
