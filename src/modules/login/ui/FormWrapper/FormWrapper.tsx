import { FC, ReactNode } from 'react';

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
    </div>
  );
};

export { FormWrapper };
