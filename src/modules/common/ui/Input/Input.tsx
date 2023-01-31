import { FC } from 'react';

import styles from '../index.module.scss';

interface InputProps {
  label: string;
  id: string;
  type: string;
  props: any;
}

const Input: FC<InputProps> = ({ label, id, type, props }) => {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} {...props} />
    </div>
  );
};

export { Input };
