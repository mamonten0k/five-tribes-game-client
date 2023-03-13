import { FC, memo } from 'react';
import { Button } from '../../../common/ui';

type BetProps = {
  betAmount: number;
  onClick: (betId: string) => void;
  styled?: string;
  isDisabled: boolean;
};

const Bet: FC<BetProps> = ({ betAmount, onClick, styled = '', isDisabled }) => {
  return (
    <Button type='button' disabled={isDisabled} styled={styled} onClick={onClick}>
      {betAmount}
    </Button>
  );
};

export default memo(Bet);
