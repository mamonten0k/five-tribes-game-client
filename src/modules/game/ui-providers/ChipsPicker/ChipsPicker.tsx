import { useSelector } from 'react-redux';
import { selectInitialProvince } from '../../../../store/game/game.selectors';
import { PickedProvinceChips } from '../PickedProvinceChips/PickedProvinceChips';

import styles from '../../index.module.scss';

export const ChipsPicker = () => {
  const provinceFrom = useSelector(selectInitialProvince);

  return (
    <>
      {!provinceFrom ? (
        <div className={styles.note_2}>Выберите провинцию</div>
      ) : (
        <PickedProvinceChips provinceFrom={provinceFrom.toString()} />
      )}
    </>
  );
};
