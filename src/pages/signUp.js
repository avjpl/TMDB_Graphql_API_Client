import { useQuery } from '@apollo/client';
import { SignUpForm } from '../components/forms';
import { IS_LOGGED_IN } from '../apollo/queries';

const SignUp = () => {
  const { data } = useQuery(IS_LOGGED_IN);

  return !data.isLoggedIn && <SignUpForm />;
};

export default SignUp;
