import { RootState } from '../index';

export const selectGameModule = (state: RootState) => state.game;
export const selectGameLoadingState = (state: RootState) => selectGameModule(state).isLoading;
