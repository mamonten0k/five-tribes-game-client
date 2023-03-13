import { useSelector } from 'react-redux';
import { selectPlayerProvinces, selectSelfData } from '../../../../../store/game/game.selectors';

import { v4 as uuid } from 'uuid';

import { Player } from '../../../ui/Player';

import styles from '../../../index.module.scss';

export const UserProvider = () => {
  const user = useSelector(selectSelfData);
  const provinces = useSelector(selectPlayerProvinces);

  return (
    <>
      {user && (
        <Player.Container styled={styles.player_self}>
          <Player.Helmet name={user.name} />
          <Player.Info coinsAmt={user.coins} />
          <h4 className={styles.province_heading_player}>Провинции под контролем</h4>
          <div className={styles.province_container}>
            {provinces
              ? Object.entries(provinces || []).map((province) => (
                  <span key={uuid()} className={styles.province_player}>
                    <strong>{province[0]}</strong>
                  </span>
                ))
              : 'Отсутствуют'}
          </div>
        </Player.Container>
      )}
    </>
  );
};
