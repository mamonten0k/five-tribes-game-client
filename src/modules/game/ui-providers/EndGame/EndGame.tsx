import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectWinner, selectWinnerScore } from '../../../../store/game/game.selectors';
import { gameActions } from '../../../../store/game/game.slice';

import usePostExitGame from '../../../home/hooks/usePostExitGame';

import styles from '../../index.module.scss';

export const EndGame = () => {
  const dispatch = useDispatch();

  const { gameId } = useParams();

  const exitGame = usePostExitGame();

  const winner = useSelector(selectWinner);
  const winnerScore = useSelector(selectWinnerScore);

  useEffect(() => {
    if (gameId) {
      exitGame.mutate({ gameId });
      dispatch(gameActions.disableActive());
      dispatch(gameActions.setEndGameRoundStage());
    }
  }, []);

  return (
    <section className={styles.end}>
      <h2>Конец игры</h2>
      <div className={styles.end_wrapper}>
        <div className={styles.winner_wr}>
          <h4 className={styles.end_winner}>Победитель</h4>
          <div>{winner}</div>
        </div>
        <div className={styles.points_wr}>
          <h4 className={styles.end_points}>Очки</h4>
          <div>{winnerScore}</div>
        </div>
      </div>
      <Link
        to='/home'
        onClick={() => {
          dispatch(gameActions.resetStore());
        }}
      >
        К выбору игр
      </Link>
    </section>
  );
};
