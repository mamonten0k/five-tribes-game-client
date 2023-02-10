/* eslint-disable camelcase */
import { Middleware } from 'redux';
import { io } from 'socket.io-client';

import * as tokenAPI from '../../utils/services/token.service';

import SocketEvent from '../common/socket.events';
import GameEvent from './game.events';
import { selectGameId } from './game.selectors';

import { gameActions } from './game.slice';

const gameMiddleware: Middleware = (store) => (next) => (action) => {
  if (!gameActions.initiateConnection.match(action)) {
    return next(action);
  }

  const socket = io(process.env.REACT_APP_API_URL, {
    withCredentials: true,
  });

  socket.on('connect', () => {
    socket.emit(SocketEvent.TagNewSocket, { username: tokenAPI.getUser() });
    store.dispatch(gameActions.connectionEstablished());
  });

  socket.on(SocketEvent.SendSocketTagged, () => {
    socket.emit(GameEvent.InitGame, {
      token: tokenAPI.getToken(),
      game_id: selectGameId(store.getState()),
    });
  });

  socket.on(GameEvent.SendRivalConnected, () => {
    console.log('game can be plaeyd now');
    store.dispatch(gameActions.gameConnected());
  });

  next(action);
};

export default gameMiddleware;
