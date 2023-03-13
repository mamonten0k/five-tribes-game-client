import { RootState } from '..';

export const selectErrorModule = (state: RootState) => state.error;
export const selectError = (state: RootState) => selectErrorModule(state).errorMsg;
