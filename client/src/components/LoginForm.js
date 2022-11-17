import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Form from "./Form";
import TextInput from './TextInput';

export default function LoginForm(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [loader, setLoader] = useState();

  const {login} = useAuth();

  // handle login on submit button click
  async function handleLogin(e){
    e.preventDefault();

    if(!email){
      return setError('Email required !');
    } else if(!password){
      return setError('Password required !');
    }

    // call login from useAuth()
    try {
      // remove error
      setError('');

      // show loader
      setLoader(true);

      const employeeData = {
        email,
        password,
      };

      await login(employeeData);

      // redirect to employees page after login
      window.location.href = '/employee';
    } catch (err) {
      console.log(err);

      // remove loader
      setLoader(false);

      // set error
      setError('Failed to login !');
    }
  }
  
  return(
    <Form style={{height: '330px'}} onSubmit={handleLogin}>
      <TextInput type="text" placeholder="Enter email" icon="alternate_email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <TextInput type="password" placeholder="Enter password" icon="lock" value={password} onChange={(e) => setPassword(e.target.value)} />

      {/* disable button after a click when loader is active */}
      <Button disabled={loader} type='submit' variant='outline-success'>Login now</Button>

      {error && <p className='error'>{error}</p>}

      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link>.
      </div>
    </Form>
  );
}