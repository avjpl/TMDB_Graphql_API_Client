import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { isLoggedInVar } from '../../../apollo/cache';
import { Form } from '../formProvider';
import { SIGN_UP } from '../../../apollo/queries';
import { FormProvider } from '../../../context/formContext';

import styles from './form.module.css';

const SignUpForm = () => {
  const router = useRouter();
  const [signup, { loading, error }] = useMutation(SIGN_UP, {
    onCompleted({ signup }) {
      localStorage.setItem('token', signup.token);
      isLoggedInVar(true);

      router.push('/');
    },
  });

  const actions = {
    submitCallback: (data) => {
      signup({ variables: { data } });
    },
  };

  if (loading) return <p>Loading</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <FormProvider value={{}}>
      <Form {...actions}>
        <Form.Input name='username' />
        <Form.Input type='email' name='email' />
        <Form.Input type='password' name='password' />
        <div className={styles.form__actions}>
          <Form.Button text='Register' type='submit' />
        </div>
      </Form>
    </FormProvider>
  );
};

export { SignUpForm };
