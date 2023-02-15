import { RootState } from '../index';

export const selectGameModule = (state: RootState) => state.game;
export const selectGameLoadingState = (state: RootState) => selectGameModule(state).isLoading;
export const selectGameId = (state: RootState) => selectGameModule(state).gameId;
export const selectGameRival = (state: RootState) => selectGameModule(state).rival;
