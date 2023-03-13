import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGameTurnState } from '../../../../store/game/game.selectors';

import styles from '../../index.module.scss';

type CountDownProps = {
  timeLeft: number;
};

export const CountDown: FC<CountDownProps> = ({ timeLeft }) => {
  const isActive = useSelector(selectGameTurnState);
  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    setTime(timeLeft);

    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (time < 0) {
    return <div className={styles.countdown}>Время вышло</div>;
  }

  return isActive ? (
    <div className={styles.countdown}>{time}</div>
  ) : (
    <div className={styles.countdown}>Ход противника</div>
  );
};
