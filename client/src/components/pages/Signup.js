import _ from 'lodash';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import signupImage from '../assets/images/signup.svg';
import Illustration from '../Illustration';

import SignupForm from '../SignupForm';

export default function Signup() {
  const {currentUser} = useAuth();

  return currentUser.cookie && _.size(currentUser.data) > 0 ? (
    <Navigate to='/employee' />
  ) : (
    <>
      <h1>Create an account</h1>

      <div className="column">
        <Illustration height="350px" image={signupImage} alt="Signup" />

        <SignupForm />
      </div>
    </>
  );
}