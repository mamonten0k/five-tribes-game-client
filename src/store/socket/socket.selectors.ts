import { RootState } from '..';

export const selectSocketModule = (state: RootState) => state.socket;
export const selectSocketGate = (state: RootState) => selectSocketModule(state).socket;
