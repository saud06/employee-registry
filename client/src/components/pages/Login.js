import _ from 'lodash';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import loginImage from '../assets/images/login.svg';
import Illustration from "../Illustration";
import LoginForm from '../LoginForm';

export default function Login() {
  const {currentUser} = useAuth();

  return currentUser.cookie && _.size(currentUser.data) > 0 ? (
    <Navigate to='/employee' />
  ) : (
    <>
      <h1>Login to your account</h1>

      <div className="column">
        <Illustration height="350px" image={loginImage} alt="Login" />

        <LoginForm />
      </div>
    </>
  );
}