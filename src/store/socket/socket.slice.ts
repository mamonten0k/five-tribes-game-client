import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

import { DefaultEventsMap } from '@socket.io/component-emitter';

export interface SocketState {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

const initialState: SocketState = {
  socket: null,
};

const socketPersistConfig = {
  key: 'root',
  storage: storageSession,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state, action) {
      const { socket } = action.payload;
      state.socket = socket;
    },
    terminateConnection(state) {
      state.socket?.disconnect();
      state.socket = null;
    },
  },
});

export const socketActions = socketSlice.actions;
export const socketReducer = persistReducer(socketPersistConfig, socketSlice.reducer);

export const socketActionTypes = {
  SET_SOCKET: socketActions.setSocket.type,
  TERMINATE_CONNECTION: socketActions.terminateConnection.type,
};
