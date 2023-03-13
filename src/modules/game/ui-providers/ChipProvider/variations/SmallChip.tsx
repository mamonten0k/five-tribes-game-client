import { FC, memo } from 'react';

import styles from '../../../index.module.scss';

type SmallChipProps = {
  chipType: number;
};

const SmallChip: FC<SmallChipProps> = ({ chipType }) => {
  return <div className={`${styles.chip} ${styles[`chip_${chipType}`]}`} />;
};

export default memo(SmallChip);
