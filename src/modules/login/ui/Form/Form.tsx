import { FC, FormEventHandler, ReactNode } from 'react';
import { Link } from 'react-router-dom';

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
        Войти
      </button>
      <div className={styles.redirect}>
        <span>Не зарегистрированы?</span>
        <Link to='/register' className={styles.register}>
          Регистрация
        </Link>
      </div>
    </form>
  );
};

export { Form };
