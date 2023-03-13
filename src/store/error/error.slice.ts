import { createSlice } from '@reduxjs/toolkit';

type ErrorSliceState = {
  errorMsg: string | null;
};

const initialState: ErrorSliceState = {
  errorMsg: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    reset: (state, action) => {
      const { errorMsg } = action.payload;
      state.errorMsg = errorMsg;
    },
    flush: (state) => {
      state.errorMsg = null;
    },
  },
});

export const errorActions = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
