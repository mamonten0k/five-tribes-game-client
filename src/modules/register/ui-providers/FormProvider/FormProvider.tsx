import { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormWrapper } from '../../ui';
import { Input, ErrorMessage, Form } from '../../../common/ui';

import { useSignUpMutation } from '../../../../utils/api/auth.api';
import { Error, UserCredentialsParams } from '../../../../utils/types';

const FormProvider = () => {
  const navigate = useNavigate();

  const [signUp, { isLoading }] = useSignUpMutation();
  const [error, setError] = useState<Error | null>(); // Лишний ререндер, но больше удобства

  const { register, handleSubmit } = useForm<UserCredentialsParams>();

  const onSignUp = async (data: UserCredentialsParams) => {
    try {
      await signUp(data).unwrap();
      navigate('/');
    } catch (e) {
      setError(e as Error);
    }
  };

  return (
    <FormWrapper heading='Регистрация'>
      <Form submitMsg='Регистрация' onSubmit={handleSubmit(onSignUp)} isDisabled={isLoading}>
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
