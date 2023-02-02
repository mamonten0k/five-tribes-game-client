import { FC, FormEventHandler, ReactNode, ComponentPropsWithRef } from 'react';
import { Button } from '../Button/Button';

import styles from '../index.module.scss';

interface FormProps extends ComponentPropsWithRef<'form'> {
  submitMsg: string;
  isDisabled: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode[];
}

const Form: FC<FormProps> = ({ submitMsg, isDisabled, onSubmit, children, ...rest }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit} {...rest}>
      {children}
      <Button type='submit' disabled={isDisabled}>
        {submitMsg}
      </Button>
    </form>
  );
};

export { Form };
