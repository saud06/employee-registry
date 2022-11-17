import _ from 'lodash';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [lname, setLastName] = useState('');
  const [fname, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState();
  const [loader, setLoader] = useState();

  const {signup} = useAuth();

  // handle signup on submit button click
  async function handleSignup(e){
    e.preventDefault();

    if(!email){
      return setError('Email required !');
    } else if(!lname){
      return setError('Last name required !');
    } else if(!fname){
      return setError('First name required !');
    } else if(!password){
      return setError('Password required !');
    } else if(!confirmPassword){
      return setError('Confirm password required !');
    } else if(password !== confirmPassword){
      return setError('Password and confirm password don\'t match !');
    }

    // call signup from useAuth()
    try {
      // remove error
      setError('');

      // show loader
      setLoader(true);

      // signup
      const employeeData = {
        'username' : `${_.lowerCase(fname)}01`,
        email,
        password,
        lname,
        fname,
        'role': 'user'
      };
  
      await signup(employeeData);

      // redirect to login page after signup
      window.location.href ='/login';
    } catch (err) {
      console.log(err);

      // remove loader
      setLoader(false);

      // set error
      setError('Failed to signup !');
    }
  }

  return(
    <Form style={{height: '500px'}} onSubmit={handleSignup} >
      <TextInput type="text" placeholder="Input email" icon="alternate_email" value={email} onChange={(e) => setEmail(e.target.value)} />
      
      <TextInput type="text" placeholder="Input last name" icon="person" value={lname} onChange={(e) => setLastName(e.target.value)} />

      <TextInput type="text" placeholder="Input first name" icon="person" value={fname} onChange={(e) => setFirstName(e.target.value)} />

      <TextInput type="password" placeholder="Input password" icon="lock" value={password} onChange={(e) => setPassword(e.target.value)} />

      <TextInput type="password" placeholder="Confirm password" icon="lock_clock" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

      {/* disable button after a click when loader is active */}
      <Button disabled={loader} type='submit' variant='outline-success'>Submit</Button>

      {error && <p className='error'>{error}</p>}

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}