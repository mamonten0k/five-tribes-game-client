import { useSelector } from 'react-redux';
import {
  selectGameLoadingState,
  selectGameRoundStage,
  selectTimeLeft,
  selectTurnsOrder,
} from '../../../../store/game/game.selectors';
import { Turn } from '../../ui';

import { v4 as uuid } from 'uuid';

import * as tokenAPI from '../../../../utils/services/token/token.service';

import styles from '../../index.module.scss';
import { CountDown } from '../CountDown/CountDown';

export const TurnsProvider = () => {
  const turnsOrder = useSelector(selectTurnsOrder);
  const isLoading = useSelector(selectGameLoadingState);
  const roundStage = useSelector(selectGameRoundStage);
  const timeLeft = useSelector(selectTimeLeft);

  if (isLoading || roundStage === -1) {
    return null;
  }

  if (!turnsOrder || 'notification_message' in turnsOrder[0]) {
    return (
      <section className={styles.state_wrapper}>
        <section className={styles.countdown_wrapper}>
          <h4>Время на ход</h4>
          <CountDown timeLeft={timeLeft || 0} />
        </section>
        <section className={styles.turns_order}>
          <h4>Порядок ходов в раунде</h4>
          <span className={styles.note}>Сделайте ставку</span>
        </section>
      </section>
    );
  }

  return (
    <div className={styles.state_wrapper}>
      <section className={styles.countdown_wrapper}>
        <h4>Время на ход</h4>
        <CountDown timeLeft={timeLeft || 0} />
      </section>
      <section className={styles.turns_order}>
        <h4>Порядок ходов в раунде</h4>
        <ul className={styles.turns}>
          {turnsOrder?.map((turn) => (
            <li key={uuid()}>
              <Turn isRival={!(tokenAPI.getUser() === turn.player)}>{turn.player}</Turn>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
