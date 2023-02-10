import { createSlice } from '@reduxjs/toolkit';

import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

export interface GameState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  isLoading: boolean;
  id: string | null;
  rival: string | null;
  timestamp: string | null;
}

const initialState: GameState = {
  isEstablishingConnection: false,
  isConnected: false,
  isLoading: false,
  id: null,
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
      const { id, rival, timestamp } = action.payload;
      state.id = id;
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
