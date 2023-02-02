import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from '../../index.module.scss';

interface FormWrapperProps {
  heading: string;
  children: ReactNode;
}

const FormWrapper: FC<FormWrapperProps> = ({ heading, children }) => {
  return (
    <div className={styles.layout}>
      <h2>{heading}</h2>
      {children}
      <div className={styles.redirect}>
        <span>Не зарегистрированы?</span>
        <Link to='/register' className={styles.register}>
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export { FormWrapper };
