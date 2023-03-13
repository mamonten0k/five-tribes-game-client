import { createSlice } from '@reduxjs/toolkit';

import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

import { tokenService } from '../../utils';

type Player = {
  name: string;
  coins: number;
};

type Turn = {
  player: string;
};

export type Chip = {
  provinceId: number;
  chipId: number;
  chipType: 1 | 2 | 3 | 4 | 5;
};

export type Province = {
  row: 0 | 1 | 2 | 3 | 4;
  col: 0 | 1 | 2 | 3 | 4 | 5;
  provinceId: number;
  points: number;
};

type ProvinceChips = {
  [provinceId: string]: Array<Chip | null> | null;
};

type ownedProvinces = {
  [provinceId: string]: number;
};

type ownedChips = {
  [chipId: string]: number;
};

export interface GameState {
  [name: string]: any;

  isEstablishingConnection: boolean;
  isConnected: boolean;
  isLoading: boolean;
  isActive: boolean;
  gameId: string | null;
  timestamp: string | null;
  round: number | null;
  roundStage: number | null;
  errorMessage: string | null;

  self: Player | null;
  rival: Player | null;

  turnsOrder: Array<Turn> | null;

  gameField: Array<Province>;
  gameChips: ProvinceChips;

  playerChips: ownedChips | null;
  rivalChips: ownedChips | null;

  playerProvinces: ownedProvinces | null;
  rivalProvinces: ownedProvinces | null;

  selectedProvince: number | null;

  provinceFrom: number | null;
  provinceTo: number | null;

  selectedChip: number | null;
  selectedChips: Array<Chip | null> | null;

  score: number | null;
  winner: string | null;

  timeLeft: number | null;
}

const initialState: GameState = {
  isEstablishingConnection: false,
  isConnected: false,
  isLoading: false,
  isActive: false,
  errorMessage: null,

  gameId: null,
  timestamp: null,

  round: 1,
  roundStage: 0,

  self: null,
  rival: null,

  turnsOrder: null,

  gameField: [],
  gameChips: {},

  selectedProvince: null,
  selectedChips: [],

  provinceFrom: null,
  provinceTo: null,

  selectedChip: null,

  score: null,
  winner: null,

  playerChips: {},
  rivalChips: {},

  playerProvinces: {},
  rivalProvinces: {},

  timeLeft: null,
};

const gamePersistConfig = {
  key: 'root',
  storage: storageSession,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updatePlayersCoins: (state, action) => {
      const { playersCoins } = action.payload;
      const rivalIndex = state.rival?.name === playersCoins[0].player ? 0 : 1;

      state.rival = {
        name: playersCoins[rivalIndex].player,
        coins: playersCoins[rivalIndex].coinsAmount,
      };

      state.self = {
        name: playersCoins[rivalIndex ^ 1].player,
        coins: playersCoins[rivalIndex ^ 1].coinsAmount,
      };
    },
    updateTurnsOrder: (state, action) => {
      const { turnsOrder } = action.payload;

      state.turnsOrder = turnsOrder || [];
    },
    setEndGameRoundStage: (state) => {
      state.roundStage = -1;
    },
    updateGameState: (state, action) => {
      const { activePlayer, round, roundStage, timeLeft } = action.payload;

      state.round = round;
      state.roundStage = roundStage;
      state.isActive = activePlayer !== state.rival?.name;
      state.timeLeft = timeLeft;
      state.isLoading = false;
    },
    updateGameField: (state, action) => {
      const { gameField } = action.payload;

      state.gameField = gameField;
    },
    updateGameChips: (state, action) => {
      const { gameChips } = action.payload;
      const provinceChips: any = {};

      for (const { provinceId, chipId, chipType } of gameChips || []) {
        if (provinceChips[provinceId]) {
          provinceChips[provinceId].push({ chipId, chipType });
        } else {
          provinceChips[provinceId] = [{ chipId, chipType }];
        }
      }

      if (state.provinceFrom) {
        delete provinceChips[state.provinceFrom];
      }

      state.gameChips = provinceChips;
      state.storedGameChips = provinceChips;
    },
    handlePlacement: (state, action) => {
      const { provinceId } = action.payload;

      if (!state.isActive) {
        return;
      }

      if (!state.provinceFrom) {
        state.provinceFrom = provinceId;
        state.selectedChips = state.gameChips[provinceId];
        state.gameChips[provinceId] = [];
      }

      state.selectedProvince = provinceId;
      state.provinceTo = provinceId;
    },
    refreshSecondStage: (state) => {
      const c = state.selectedChips?.find((chip) => chip?.chipId === state.selectedChip);

      if (c && state.selectedProvince) {
        state.gameChips[state.selectedProvince] =
          state.gameChips[state.selectedProvince]?.filter(
            (chip) => chip?.chipType !== c.chipType,
          ) || [];
      }

      state.provinceFrom = null;
      state.selectedChip = null;
      state.selectedChips = null;
    },
    handlePickChip: (state, action) => {
      const { chipId } = action.payload;

      state.selectedChip = chipId;
    },
    updateError: (state, action) => {
      const { errorMessage } = action.payload;

      state.errorMessage = errorMessage;
    },
    updateProvinces: (state, action) => {
      const { provincesToUpdate } = action.payload;

      const provinceChips: any = {};

      for (const { provinceId, chipId, chipType } of provincesToUpdate || []) {
        if (provinceChips[provinceId]) {
          provinceChips[provinceId].push({ chipId, chipType });
          continue;
        }

        provinceChips[provinceId] = [{ chipId, chipType }];
      }

      for (const id of Object.keys(provinceChips)) {
        if (+id === state.provinceFrom) state.selectedChips = provinceChips[id];
        else state.gameChips[id] = provinceChips[id];
      }
    },
    resetStore: (state) => {
      for (const key of Object.keys(initialState)) state[key] = initialState[key];
    },
    resetGameState: (state) => {
      state.gameId = null;
      state.rival = null;
      state.roundStage = 0;
      state.isLoading = true;
    },
    finishGame: (state, action) => {
      const { score, winner } = action.payload;

      state.score = score;
      state.winner = winner;
      state.isActive = false;
      state.roundStage = -1;
      state.isLoading = false;
      state.turnsOrder = null;
    },
    updateOwnedProvinces: (state, action) => {
      const { ownedProvinces } = action.payload;

      state.playerProvinces = {};
      state.rivalProvinces = {};

      for (const province of ownedProvinces) {
        if (province.player === state.rival?.name) {
          state.rivalProvinces[province.provinceId] = province.points;
        } else {
          state.playerProvinces[province.provinceId] = province.points;
        }
      }
    },
    updateTimeLeft: (state, action) => {
      const { timeLeft } = action.payload;

      state.timeLeft = timeLeft;
    },
    placeChip: (state, action) => {
      const { chipId, provinceId } = action.payload;

      const chip = state.selectedChips?.find((chip) => chip?.chipId === chipId);

      if (chip) {
        state.selectedChips =
          state.selectedChips?.filter((chip) => chip?.chipType === chip?.chipType) || null;
        state.gameChips[provinceId]?.push(chip);
      }
    },
    updateSelectedChips: (state, action) => {
      const { selectedChips } = action.payload;

      const map: any = {};

      for (const { chipId } of selectedChips) {
        map[chipId] = true;
      }

      const res: any = [];

      for (const el of state.selectedChips || []) {
        if (!map[el?.chipId as any]) {
          res.push(el);
        }
      }

      state.selectedChips = res;
    },
    updateOwnedChips: (state, action) => {
      const { ownedChips } = action.payload;

      state.playerChips = {};
      state.rivalChips = {};

      for (const chip of ownedChips) {
        if (chip.player === state.rival) {
          state.rivalChips[chip.chipId] = chip.chipAmount;
        } else {
          state.playerChips[chip.chipId] = chip.chipAmount;
        }
      }
    },
    disableActive: (state) => {
      state.isActive = false;
    },
    setGameId: (state, action) => {
      const { gameId, rival } = action.payload;

      state.gameId = gameId;
      state.rival = { name: rival, coins: 0 };
      state.self = { name: tokenService.getUser() || '', coins: 0 };
    },
  },
});

export const gameActions = gameSlice.actions;
export const gameReducer = persistReducer(gamePersistConfig, gameSlice.reducer);
