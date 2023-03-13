import { createSlice } from '@reduxjs/toolkit';

type NotificationSliceState = {
  notificationMsg: string | null;
};

const initialState: NotificationSliceState = {
  notificationMsg: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: (state, action) => {
      const { notificationMsg } = action.payload;
      state.notificationMsg = notificationMsg;
    },
    flush: (state) => {
      state.notificationMsg = null;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
