import { FC, MouseEvent, ReactNode, ComponentPropsWithRef } from 'react';

import styles from '../index.module.scss';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  onClick?: (e?: MouseEvent | Event | any) => void;
  children: ReactNode | ReactNode[];
  styled?: string;
  isDisabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, styled, isDisabled, onClick, ...rest }) => {
  return (
    <button
      disabled={isDisabled}
      className={styles.button + ` ${styled}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  isDisabled: false,
};
