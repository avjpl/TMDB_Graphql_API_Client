import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { isLoggedInVar } from '../../../apollo/cache';
import { Form } from '../formProvider';
import { LOGIN } from '../../../apollo/queries';
import { FormProvider } from '../../../context/formContext';

import styles from './form.module.css';

const LoginForm = () => {
  const router = useRouter();
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem('token', login.token);
      isLoggedInVar(true);

      router.push('/');
    },
  });

  const actions = {
    submitCallback: (data) => {
      login({ variables: { data } });
    },
  };

  if (loading) return <p>Loading</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <FormProvider value={{}}>
      <Form {...actions}>
        <Form.Input type='email' name='email' />
        <Form.Input type='password' name='password' />
        <div className={styles.form__actions}>
          <Form.Button text='Login' type='submit' />
          <Form.InternalLink text='Register' href={'/signUp'} />
        </div>
      </Form>
    </FormProvider>
  );
};

export { LoginForm };
