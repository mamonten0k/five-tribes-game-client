import { FC, FormEventHandler, ReactNode } from 'react';

import styles from '../../index.module.scss';

type FormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode[];
};

const Form: FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form className={styles.base} onSubmit={onSubmit}>
      {children}
      <button type='submit' className={styles.button}>
        Регистрация
      </button>
    </form>
  );
};

export { Form };
