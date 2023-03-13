import { useSelector } from 'react-redux';
import { selectGameField } from '../../../../store/game/game.selectors';

import Province from './Province';
import { Province as ProvinceType } from '../../../../store/game/game.slice';

import { v4 as uuid } from 'uuid';

import styles from '../../index.module.scss';

export const ProvincesProvider = () => {
  const gameField: Array<ProvinceType> = useSelector(selectGameField);

  return (
    <section className={styles.field_wrapper}>
      <h4>Игровое поле</h4>
      <div className={styles.field}>
        {gameField &&
          gameField.map((province: ProvinceType) => (
            <Province key={uuid()} provinceId={province?.provinceId} points={province.points} />
          ))}
      </div>
    </section>
  );
};
