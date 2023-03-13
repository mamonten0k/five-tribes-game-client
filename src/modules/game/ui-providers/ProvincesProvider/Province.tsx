import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import {
  checkSelectedProvince,
  getProvinceOwner,
  selectGameId,
  selectProvinceChips,
  selectSelectedChip,
} from '../../../../store/game/game.selectors';
import { gameActions } from '../../../../store/game/game.slice';
import { ChipProvider } from '../ChipProvider';

import { v4 as uuid } from 'uuid';

import styles from '../../index.module.scss';

type ProvinceProps = { provinceId: number; points: number };

const Province: FC<ProvinceProps> = ({ provinceId, points }) => {
  const provinceChips = useSelector((state: RootState) =>
    selectProvinceChips(state, { provinceId }),
  );

  const selectedProvince = useSelector((state: RootState) =>
    checkSelectedProvince(state, { provinceId }),
  );

  const dispatch = useDispatch();
  const owner = useSelector((state: RootState) => getProvinceOwner(state, { provinceId }));

  const handleClick = async () => {
    dispatch(gameActions.updateError({ errorMessage: null }));
    dispatch(gameActions.handlePlacement({ provinceId }));
  };

  return (
    <div
      className={`${styles.province} ${selectedProvince ? styles.province_h : ''} ${
        styles[`owner_${owner}`]
      }`}
      onClick={handleClick}
    >
      <span className={`${styles.province_id} ${styles[`owner_${owner}`]}`}>{provinceId}</span>
      <span className={styles.province_points}>{points}</span>
      <ul className={styles.chips}>
        {provinceChips?.map((chip: any) => (
          <li key={uuid()}>
            <ChipProvider.Small chipType={chip.chipType} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Province;
