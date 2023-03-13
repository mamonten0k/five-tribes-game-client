import { FC, ReactNode } from 'react';
import MediumChip from './variations/MediumChip';
import SmallChip from './variations/SmallChip';

type ChipProviderExtensions = {
  Small: typeof SmallChip;
  Medium: typeof MediumChip;
};

type ChipProviderProps = { children: ReactNode };

export const ChipProvider: FC<ChipProviderProps> & ChipProviderExtensions = ({ children }) => {
  return <>{children}</>;
};

ChipProvider.Small = SmallChip;
ChipProvider.Medium = MediumChip;
