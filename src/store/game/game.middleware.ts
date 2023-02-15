/* eslint-disable camelcase */
import { Middleware } from 'redux';
import { io } from 'socket.io-client';

import * as tokenAPI from '../../utils/services/token.service';

import { selectGameId } from './game.selectors';
import { gameActions } from './game.slice';

import SocketEvent from '../socket/socket.events';
import GameEvent from './game.events';

const gameMiddleware: Middleware = (store) => (next) => (action) => {
  if (!gameActions.initiateConnection.match(action)) {
    return next(action);
  }

  const gameId = selectGameId(store.getState());
  const socket = io(process.env.REACT_APP_API_URL, {
    withCredentials: true,
  });

  socket.on('connect', () => {
    socket.emit(SocketEvent.TagNewSocket, { username: tokenAPI.getUser(), gameId });
    store.dispatch(gameActions.connectionEstablished());
  });

  socket.on(SocketEvent.SendSocketTagged, () => {
    socket.emit(GameEvent.InitGame, {
      token: tokenAPI.getToken(),
      gameId,
    });
  });

  socket.on(GameEvent.SendRivalConnected, () => {
    store.dispatch(gameActions.gameConnected());
  });

  next(action);
};

export default gameMiddleware;
