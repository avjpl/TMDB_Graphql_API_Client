import { useQuery } from '@apollo/client';
import { LoginForm } from '../components/forms';
import { IS_LOGGED_IN } from '../apollo/queries';

const SignIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);

  return !data.isLoggedIn && <LoginForm />;
};

export default SignIn;
