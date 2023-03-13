import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectError } from '../../../../store/error/error.selectors';
import useCreateSession from '../../hooks/useCreateSession';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormWrapper } from '../../ui';
import { ErrorMessage, Form, Input } from '../../../common/ui';

import { UserParams } from '../../../../utils/types';

const FormProvider = () => {
  const navigate = useNavigate();

  const signIn = useCreateSession();
  const error = useSelector(selectError);

  const { register, handleSubmit } = useForm<UserParams>();

  const onSignIn = (data: UserParams) => {
    signIn.mutate(data);
  };

  useEffect(() => {
    if (!error && signIn.isSuccess) {
      navigate('/');
    }
  }, [signIn.isSuccess]);

  return (
    <FormWrapper heading='Вход'>
      <Form submitMsg='Войти' onSubmit={handleSubmit(onSignIn)} isDisabled={signIn.isLoading}>
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
        {error && <ErrorMessage message={error} />}
      </Form>
    </FormWrapper>
  );
};

export { FormProvider };
