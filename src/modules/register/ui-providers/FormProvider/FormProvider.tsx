import { useContext, useState } from 'react';
import { AxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Form } from '../../ui/Form/Form';
import { SocketContext } from '../../../../contexts/SocketContext';

import { signUp } from '../../../../utils/api';
import { UserCredentialsParams } from '../../../../utils/types';

import styles from '../../index.module.scss';

const FormProvider = () => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const [error, setError] = useState<string>();

  const { register, handleSubmit } = useForm<UserCredentialsParams>();

  const onSubmit = async (data: UserCredentialsParams) => {
    try {
      await signUp(data);
      socket.connect();
      console.log(socket.connected);
      navigate('/');
    } catch (e: AxiosError | unknown) {
      setError(e instanceof AxiosError ? e.response?.data.message : 'Неизвестная ошибка.');
    }
  };

  return (
    <div className={styles.layout}>
      <h2>Регистрация</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input}>
          <label htmlFor='username'>Имя пользователя</label>
          <input type='text' id='username' {...register('username', { required: true })} />
        </div>
        <div className={styles.input}>
          <label htmlFor='password'>Пароль</label>
          <input type='password' id='password' {...register('password', { required: true })} />
        </div>
        {!!error && <div className={styles.error}>{error}</div>}
      </Form>
    </div>
  );
};

export { FormProvider };
