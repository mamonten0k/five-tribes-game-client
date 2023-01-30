import { MouseEvent, useContext } from 'react';
import { SocketContext } from '../../../../contexts/SocketContext';

import * as tokenAPI from '../../../../utils/services/token.service';

import { Spinner } from '../../../common/ui';
import { FindGame } from '../../ui/FindGame/FindGame';

import styles from '../index.module.scss';

const FindGameProvider = () => {
  const socket = useContext(SocketContext);

  const onFindGame = async (e: MouseEvent) => {
    try {
      const result = socket.emit('onNewGame', { token: tokenAPI.getToken() });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  // if (stage === '0') {
  //   return <Spinner message='Поиск игры...' />;
  // }

  return <FindGame onFindGame={onFindGame} />;
};

export { FindGameProvider };
