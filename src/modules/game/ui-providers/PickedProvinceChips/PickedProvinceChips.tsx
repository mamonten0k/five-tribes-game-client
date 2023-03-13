import { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import usePostHandlePlaceChip from '../../hooks/usePostHandlePlaceChip';

import {
  selectErrorMessage,
  selectSelectedChip,
  selectSelectedChips,
  selectSelectedProvince,
} from '../../../../store/game/game.selectors';

import { ChipProvider } from '../ChipProvider';

import { v4 as uuid } from 'uuid';

import styles from '../../index.module.scss';
import useGetUpdatedGameField from '../../hooks/useGetUpdatedGameField';

type PickedProvinceChipsProps = {
  provinceFrom: string;
};

export const PickedProvinceChips: FC<PickedProvinceChipsProps> = ({ provinceFrom }) => {
  const provinceChips = useSelector(selectSelectedChips);
  const provinceId = useSelector(selectSelectedProvince)?.toString();
  const chipId = useSelector(selectSelectedChip);
  const error = useSelector(selectErrorMessage);

  const { gameId } = useParams();
  const handlePlaceChip = usePostHandlePlaceChip();
  const handleUpdateGameField = useGetUpdatedGameField();

  useEffect(() => {
    if (chipId && provinceId && provinceFrom !== provinceId) {
      handlePlaceChip.mutate({ chipId, provinceId, gameId: gameId || '' });
      handleUpdateGameField.mutate({ gameId: gameId || '' });
    }
  }, [chipId, provinceId]);

  return (
    <>
      <div className={styles.note_2}>Выставьте фишки в провинции</div>
      <ul className={`${styles.chips} ${styles.chips_pd}`}>
        {provinceChips?.map((chip: any) => (
          <li key={uuid()}>
            <ChipProvider.Medium chipType={chip.chipType} chipId={chip.chipId} />
          </li>
        ))}
      </ul>
      {error && <div className={styles.error}>{error}</div>}
    </>
  );
};
