/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpService } from '../http/http.service';

import { Token } from '../../types/typeorm';

import {
  HandleBetParams,
  HandlePlaceChipParams,
  Response,
  UserParams,
  WithGameIdParams,
  WithTokenParams,
} from '../../types';

const httpService = new HttpService();

function createOne(params: UserParams): Promise<Token> {
  return httpService.post(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'sign_up',
      p1: params.username,
      p2: params.password,
    },
  });
}

function createSession(params: UserParams): Promise<Token> {
  return httpService.post(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'create_session',
      p1: params.username,
      p2: params.password,
    },
  });
}

function validateSession(params: WithTokenParams): Promise<Response<any>> {
  return httpService.post(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'validate_session',
      p1: params.token,
    },
  });
}

function placeInQueue(params: WithTokenParams): Promise<Response<any>> {
  return httpService.post(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'place_in_queue',
      p1: params.token,
    },
  });
}

function removeFromQueue(params: WithTokenParams): Promise<Response<any>> {
  return httpService.post(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'remove_from_queue',
      p1: params.token,
    },
  });
}

function getStatusInQueue(params: WithTokenParams): Promise<Response<any>> {
  return httpService.post(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'get_status_in_queue',
      p1: params.token,
    },
  });
}

function getExistingGames(params: WithTokenParams): Promise<Response<any>> {
  return httpService.postRows(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'get_existing_games',
      p1: params.token,
      format: 'rows',
    },
  });
}

function exitGame(params: WithGameIdParams): Promise<Response<any>> {
  return httpService.post(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'exit_game',
      p1: params.token,
      p2: params.gameId,
    },
  });
}

function getCurrentTurnData(params: WithGameIdParams): Promise<Response<any>> {
  return httpService.postRows(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'get_current_turn_data',
      p1: params.token,
      p2: params.gameId,
      format: 'rows',
    },
  });
}

function getGameData(params: WithGameIdParams): Promise<Response<any>> {
  return httpService.postRows(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'get_game_data',
      p1: params.token,
      p2: params.gameId,
      format: 'rows',
    },
  });
}

function getBetOptions(params: WithGameIdParams): Promise<Response<any>> {
  return httpService.postRows(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'get_bet_options',
      p1: params.token,
      p2: params.gameId,
      format: 'rows',
    },
  });
}

function getTurnsData(params: WithGameIdParams): Promise<Response<any>> {
  return httpService.postRows(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'get_turns_order',
      p1: params.token,
      p2: params.gameId,
      format: 'rows',
    },
  });
}

function handleBet(params: HandleBetParams): Promise<Response<any>> {
  return httpService.post(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'handle_bet',
      p1: params.token,
      p2: String(params.betId),
      p3: params.gameId,
    },
  });
}

function handlePlaceChip(params: HandlePlaceChipParams): Promise<Response<any>> {
  return httpService.post(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'handle_place_chip',
      p1: params.token,
      p2: String(params.chipId),
      p3: String(params.provinceId),
      p4: params.gameId,
    },
  });
}

function getUpdatedProvinces(params: HandlePlaceChipParams): Promise<Response<any>> {
  return httpService.postRows(process.env.REACT_APP_DATABASE_URL, {
    params: {
      db: process.env.REACT_APP_DATABASE_ID,
      pname: 'get_updated_provinces',
      p1: params.token,
      p2: String(params.provinceId),
      p3: params.gameId,
      format: 'rows',
    },
  });
}

export const dbService = {
  createOne,
  createSession,
  validateSession,
  placeInQueue,
  removeFromQueue,
  getStatusInQueue,
  getExistingGames,
  exitGame,
  getCurrentTurnData,
  getUpdatedProvinces,
  getGameData,
  getBetOptions,
  getTurnsData,
  handlePlaceChip,
  handleBet,
};
