import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormWrapper } from '../../ui';
import { ErrorMessage, Form, Input } from '../../../common/ui';

import { Error, UserCredentialsParams } from '../../../../utils/types';
import { useSignInMutation } from '../../../../utils/api/auth.api';

const FormProvider = () => {
  const navigate = useNavigate();

  const [signIn, { isLoading }] = useSignInMutation();
  const [error, setError] = useState<Error | null>(); // Лишний ререндер, но больше удобства

  const { register, handleSubmit } = useForm<UserCredentialsParams>();

  const onSignIn = async (data: UserCredentialsParams) => {
    try {
      await signIn(data).unwrap();
      navigate('/');
    } catch (e) {
      setError(e as Error);
    }
  };

  return (
    <FormWrapper heading='Вход'>
      <Form submitMsg='Войти' onSubmit={handleSubmit(onSignIn)} isDisabled={isLoading}>
        <Input
          label='Логин пользователя'
          id='username'
          type='text'
          refs={register('username', { required: true })}
        />
        <Input
          label='Пароль'
          id='password'
          type='password'
          refs={register('password', { required: true })}
        />
        {error && <ErrorMessage message={error.data.message} />}
      </Form>
    </FormWrapper>
  );
};

export { FormProvider };
