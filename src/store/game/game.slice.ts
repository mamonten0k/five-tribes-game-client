import { createSlice } from '@reduxjs/toolkit';

export interface GameState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  isLoading: boolean;
}

const initialState: GameState = {
  isEstablishingConnection: false,
  isConnected: false,
  isLoading: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initiateConnection: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    placeInQueue: (state) => {
      state.isLoading = true;
    },
    gameConnected: (state) => {
      console.log(state);
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice;
