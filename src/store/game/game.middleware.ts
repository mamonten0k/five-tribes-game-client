import { Middleware } from 'redux';
import { io } from 'socket.io-client';

import * as tokenAPI from '../../utils/services/token.service';

import SocketEvent from '../common/socket.events';
import GameEvent from './game.events';

import { gameActions } from './game.slice';

const gameMiddleware: Middleware = (store) => (next) => (action) => {
  if (!gameActions.initiateConnection.match(action) && !gameActions.placeInQueue.match(action)) {
    return next(action);
  }

  const socket = io(process.env.REACT_APP_API_URL, {
    withCredentials: true,
  });

  socket.on('connect', () => {
    socket.emit(SocketEvent.TagNewSocket, { token: tokenAPI.getToken() });
    store.dispatch(gameActions.connectionEstablished());
  });

  if (!gameActions.placeInQueue.match(action)) {
    return next(action);
  }

  socket.on('onSocketTagged', () => {
    socket.emit(GameEvent.PlaceInQueue);
  });

  socket.on(GameEvent.SendStatusInQueue, (data) => {
    console.log(data);
  });

  next(action);
};

export default gameMiddleware;
