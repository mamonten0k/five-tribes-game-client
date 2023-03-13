import { RootState } from '../index';

export const selectGameModule = (state: RootState) => state.game;
export const selectGameLoadingState = (state: RootState) => selectGameModule(state).isLoading;
export const selectGameId = (state: RootState) => selectGameModule(state).gameId;
export const selectGameRound = (state: RootState) => selectGameModule(state).round;
export const selectGameRoundStage = (state: RootState) => selectGameModule(state).roundStage;
export const selectGameTurnState = (state: RootState) => selectGameModule(state).isActive;

export const selectSelfData = (state: RootState) => selectGameModule(state).self;
export const selectRivalData = (state: RootState) => selectGameModule(state).rival;

export const selectBetOptions = (state: RootState) => selectGameModule(state).betOptions;
export const selectTurnsOrder = (state: RootState) => selectGameModule(state).turnsOrder;

export const selectGameField = (state: RootState) => selectGameModule(state).gameField;
export const selectProvinceChips = (state: RootState, { provinceId }: { provinceId: number }) => {
  return (selectGameModule(state).gameChips as any)[provinceId];
};

export const selectSelectedProvince = (state: RootState) =>
  selectGameModule(state).selectedProvince;
export const selectInitialProvince = (state: RootState) => selectGameModule(state).provinceFrom;
export const selectDestinationProvince = (state: RootState) => selectGameModule(state).provinceTo;

export const checkSelectedProvince = (state: RootState, { provinceId }: { provinceId: number }) => {
  return selectGameModule(state).selectedProvince === provinceId;
};

export const selectSelectedChip = (state: RootState) => selectGameModule(state).selectedChip;
export const selectSelectedChips = (state: RootState) => selectGameModule(state).selectedChips;
export const selectErrorMessage = (state: RootState) => selectGameModule(state).errorMessage;

export const selectWinner = (state: RootState) => selectGameModule(state).winner;
export const selectWinnerScore = (state: RootState) => selectGameModule(state).score;

export const selectPlayerChips = (state: RootState) => selectGameModule(state).playerChips;
export const selectPlayerProvinces = (state: RootState) => selectGameModule(state).playerProvinces;

export const selectRivalChips = (state: RootState) => selectGameModule(state).rivalChips;
export const selectRivalProvinces = (state: RootState) => selectGameModule(state).rivalProvinces;

export const getProvinceOwner = (state: RootState, { provinceId }: { provinceId: number }) => {
  const playerProvinces = selectPlayerProvinces(state);
  const rivalProvinces = selectRivalProvinces(state);
  if (playerProvinces && playerProvinces[provinceId]) return 1;
  if (rivalProvinces && rivalProvinces[provinceId]) return 2;
  return 3;
};

export const selectTimeLeft = (state: RootState) => selectGameModule(state).timeLeft;
