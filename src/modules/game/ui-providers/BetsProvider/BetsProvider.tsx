import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameTurnState } from '../../../../store/game/game.selectors';
import useGetBetOptions from '../../hooks/useGetBetsData';
import usePostHandleBet from '../../hooks/usePostHandleBet';

import { v4 as uuid } from 'uuid';

import { BetType } from '../../../../utils/types';
import Bet from '../../ui/Bet/Bet';

import styles from '../../index.module.scss';
import { gameActions } from '../../../../store/game/game.slice';

const BetsProvider = () => {
  const { gameId } = useParams();
  const { data, isLoading, isFetching, refetch } = useGetBetOptions({ gameId: gameId || '' });

  const dispatch = useDispatch();

  const isActive = useSelector(selectGameTurnState);

  const handleBet = usePostHandleBet();

  const handleClick = useCallback(async (betId: number) => {
    await handleBet.mutateAsync({ betId, gameId: gameId || '' });
    dispatch(gameActions.disableActive());
    refetch();
  }, []);

  if (isLoading || isFetching || handleBet.isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.bets}>
      {data.map(({ betId, betAmount }: BetType) => (
        <Bet
          key={uuid()}
          styled={styles.bet}
          isDisabled={!isActive}
          onClick={() => {
            handleClick(betId);
          }}
          betAmount={betAmount}
        />
      ))}
    </div>
  );
};

export default BetsProvider;
