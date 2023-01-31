import { FC, FormEventHandler, ReactNode } from 'react';

import styles from '../../index.module.scss';

type FormProps = {
  isDisabled: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode[];
};

const Form: FC<FormProps> = ({ isDisabled, onSubmit, children }) => {
  return (
    <form className={styles.base} onSubmit={onSubmit}>
      {children}
      <button type='submit' disabled={isDisabled} className={styles.button}>
        Регистрация
      </button>
    </form>
  );
};

export { Form };
