import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError } from '../../../../store/error/error.selectors';
import { errorActions } from '../../../../store/error/error.slice';
import useCreateSession from '../../hooks/useCreateOne';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormWrapper } from '../../ui';
import { Input, ErrorMessage, Form } from '../../../common/ui';

import { UserParams } from '../../../../utils/types';

const FormProvider = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUp = useCreateSession();
  const error = useSelector(selectError);

  const { register, handleSubmit } = useForm<UserParams>();

  const onSignUp = async (data: UserParams) => {
    signUp.mutate(data);
  };

  useEffect(() => {
    dispatch(errorActions.flush());
  }, []);

  useEffect(() => {
    if (!error && signUp.isSuccess) {
      navigate('/');
    }
  }, [signUp.isSuccess]);

  return (
    <FormWrapper heading='Регистрация'>
      <Form submitMsg='Регистрация' onSubmit={handleSubmit(onSignUp)} isDisabled={signUp.isLoading}>
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
