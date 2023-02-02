import { FC, ComponentPropsWithRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from '../index.module.scss';

interface InputProps extends ComponentPropsWithRef<'input'> {
  label: string;
  id: string;
  type: string;
  refs: UseFormRegisterReturn<any>;
}

const Input: FC<InputProps> = ({ label, id, type, refs }) => {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} {...refs} />
    </div>
  );
};

export { Input };
