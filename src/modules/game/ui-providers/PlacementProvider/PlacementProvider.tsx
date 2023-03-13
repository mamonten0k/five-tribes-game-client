import { useSelector } from 'react-redux';
import { selectGameTurnState } from '../../../../store/game/game.selectors';
import { ChipsPicker } from '../ChipsPicker/ChipsPicker';

import styles from '../../index.module.scss';

export const PlacementProvider = () => {
  const isActive = useSelector(selectGameTurnState);

  return (
    <section className={styles.placement}>
      <h4>Стадия перестановки фишек</h4>
      {isActive ? <ChipsPicker /> : <div className={styles.note_2}>Ваш ход - следующий</div>}
    </section>
  );
};
