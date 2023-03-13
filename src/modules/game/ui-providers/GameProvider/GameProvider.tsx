import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectGameLoadingState,
  selectGameRoundStage,
} from '../../../../store/game/game.selectors';
import useGetGameData from '../../hooks/useGetGameData';
import BetsProvider from '../BetsProvider/BetsProvider';

import { Spinner } from '../../../common/ui';
import { ProvincesProvider } from '../ProvincesProvider/ProvincesProvider';
import { PlacementProvider } from '../PlacementProvider/PlacementProvider';
import { EndGame } from '../EndGame/EndGame';

export const GameProvider = () => {
  const { gameId } = useParams();
  const { refetch } = useGetGameData({ gameId: gameId || '' });

  const isLoading = useSelector(selectGameLoadingState);
  const roundStage = useSelector(selectGameRoundStage);

  useEffect(() => {
    const interval = setInterval(() => {
      if (roundStage !== -1) refetch();
      else clearInterval(interval);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <Spinner message='Загружаем нужные данные...' />;

  if (roundStage === 0) {
    return <BetsProvider />;
  }

  if (roundStage === 1) {
    return (
      <>
        <PlacementProvider />
        <ProvincesProvider />
      </>
    );
  }

  return <EndGame />;
};
