import { useSelector } from 'react-redux';
import {
  selectRivalChips,
  selectRivalData,
  selectRivalProvinces,
} from '../../../../../store/game/game.selectors';

import { Player } from '../../../ui/Player';

import { v4 as uuid } from 'uuid';

import styles from '../../../index.module.scss';

export const RivalProvider = () => {
  const rival = useSelector(selectRivalData);
  const provinces = useSelector(selectRivalProvinces);
  const chips = useSelector(selectRivalChips);

  return (
    <>
      {rival && (
        <Player.Container styled={styles.player_rival}>
          <Player.Helmet name={rival.name} />
          <Player.Info coinsAmt={rival?.coins} />
          <h4 className={styles.province_heading_rival}>Провинции под контролем</h4>
          {provinces
            ? Object.entries(provinces || []).map((province) => (
                <div key={uuid()} className={styles.province_container}>
                  <span className={styles.province_rival}>
                    <strong>{province[0]}</strong>
                  </span>
                </div>
              ))
            : 'Отсутствуют'}
        </Player.Container>
      )}
    </>
  );
};
