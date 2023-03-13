import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedChip } from '../../../../../store/game/game.selectors';
import { gameActions } from '../../../../../store/game/game.slice';

import styles from '../../../index.module.scss';

type MediumChipProps = {
  chipType: number;
  chipId: number;
};

const MediumChip: FC<MediumChipProps> = ({ chipId, chipType }) => {
  const selectedChip = useSelector(selectSelectedChip);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(gameActions.handlePickChip({ chipId }));
  };

  return (
    <div
      className={`${styles.chip} ${styles.chip_md} ${styles[`chip_${chipType}`]}  ${
        chipId === selectedChip ? styles.chip_h : ''
      }`}
      onClick={handleClick}
    />
  );
};

export default memo(MediumChip);
