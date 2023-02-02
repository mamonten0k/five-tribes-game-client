import { FC, MouseEvent, ReactNode, ComponentPropsWithRef } from 'react';

import styles from '../index.module.scss';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  onClick?: (e?: MouseEvent | Event) => void;
  children: ReactNode | ReactNode[];
  styled?: string;
}

const Button: FC<ButtonProps> = ({ children, onClick, ...rest }) => {
  return (
    <button className={styles.button} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export { Button };
