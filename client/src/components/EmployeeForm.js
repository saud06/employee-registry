import axios from 'axios';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from "./Form";
import classes from './styles/Employee.module.css';
import TextInput from "./TextInput";

export default function EmployeeForm({employeeData}) {
  const [error, setError] = useState();
  const [loader, setLoader] = useState();

  const [updatedEmployee, setUpdatedEmployee] = useState({});
  
  useEffect(() => {
    if(!_.isEmpty(employeeData)){
      employeeData.address && employeeData.address.split('; ').forEach(item => {
        let addressData = item.split(': ');

        if(_.lowerCase(addressData[0]) === 'street' || _.lowerCase(addressData[0]) === 'strasse')
          employeeData['street'] = addressData[1];
        else if(_.lowerCase(addressData[0]) === 'no' || _.lowerCase(addressData[0]) === 'nr')
          employeeData['no'] = addressData[1];
        else if(_.lowerCase(addressData[0]) === 'zipcode' || _.lowerCase(addressData[0]) === 'plz')
          employeeData['zipcode'] = addressData[1];
        else if(_.lowerCase(addressData[0]) === 'place' || _.lowerCase(addressData[0]) === 'ort')
          employeeData['place'] = addressData[1];
        else if(_.lowerCase(addressData[0]) === 'country' || _.lowerCase(addressData[0]) === 'land')
          employeeData['country'] = addressData[1];
      });
    }

    setUpdatedEmployee(employeeData);
  }, [employeeData]);

  // handle signup on submit button click
  async function handleSubmit(e){
    e.preventDefault();

    if(!updatedEmployee.username){
      return setError('Username required !');
    } else if(!updatedEmployee.email){
      return setError('Email required !');
    } else if(!updatedEmployee.lname){
      return setError('Last name required !');
    } else if(!updatedEmployee.fname){
      return setError('First name required !');
    } else if(!updatedEmployee.password){
      return setError('Temporary password required !');
    } else if(!updatedEmployee.role){
      return setError('Role required !');
    }

    // call signup from useAuth()
    try {
      // remove error
      setError('');

      // show loader
      setLoader(true);

      // add employee
      const employee = {
        'email': updatedEmployee.email,
        'username': updatedEmployee.username,
        'lname': updatedEmployee.lname,
        'fname': updatedEmployee.fname,
        'password': updatedEmployee.password,
        'address': `Street: ${updatedEmployee.street}; No.: ${updatedEmployee.no}; Zipcode: ${updatedEmployee.zipcode}; Place: ${updatedEmployee.place}; Country: ${updatedEmployee.country}; `,
        'role': _.lowerCase(updatedEmployee.role).trim()
      };
  
      if(_.isEmpty(employeeData)){
        await axios
          .post('employees/add', employee)
          .then(response => console.log(response))
          .catch(err => console.log(err));
      } else{
        const employeeId = updatedEmployee._id;

        await axios
          .put(`employees/update/${employeeId}`, employee)
          .then(response => console.log(response))
          .catch(err => console.log(err));
      }

      // reload page
      window.location.reload();
    } catch (err) {
      console.log(err);

      // remove loader
      setLoader(false);

      // set error
      setError('Failed to add employee !');
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    
    setUpdatedEmployee(prev => {
      return({
        ...prev,
        [name]: value
      });
    })
  };

  return(
    <Form className={classes.form} onSubmit={handleSubmit} >
      <p className={classes.basic}><strong>Basic</strong></p>
      
      <TextInput type="text" name="username" placeholder="Input username" icon="person" value={updatedEmployee.username || ''} onChange={handleChange} />
      <TextInput type="text" name="email" placeholder="Input email" icon="alternate_email" value={updatedEmployee.email || ''} onChange={handleChange} />
      <TextInput type="text" name="lname" placeholder="Input last name" icon="person" value={updatedEmployee.lname || ''} onChange={handleChange} />
      <TextInput type="text" name="fname" placeholder="Input first name" icon="person" value={updatedEmployee.fname || ''} onChange={handleChange} />
      <TextInput type="password" name="password" placeholder={_.isEmpty(employeeData) ? 'Input temporaty password' : 'Input new password'} icon="lock" onChange={handleChange} />

      <p className={classes.address}><strong>Address</strong></p>
      
      <TextInput type="text" name="street" placeholder="Input street" icon="location_on" value={updatedEmployee.street || ''} onChange={handleChange} />
      <TextInput type="text" name="no" placeholder="Input no." icon="location_on" value={updatedEmployee.no || ''} onChange={handleChange} />
      <TextInput type="text" name="zipcode" placeholder="Input zipcode" icon="location_on" value={updatedEmployee.zipcode || ''} onChange={handleChange} />
      <TextInput type="text" name="place" placeholder="Input place" icon="location_on" value={updatedEmployee.place || ''} onChange={handleChange} />
      <TextInput type="text" name="country" placeholder="Input country" icon="location_on" value={updatedEmployee.country || ''} onChange={handleChange} />

      <p className={classes.role}><strong>Role</strong></p>

      <TextInput type="text" name="role" placeholder="Input role (type 'Admin' for admin role)" icon="star" value={_.upperFirst(updatedEmployee.role) || ''} onChange={handleChange} />

      {/* disable button after a click when loader is active */}
      <Button disabled={loader} type='submit' variant='outline-success'>Submit</Button>

      {error && <p className='error'>{error}</p>}

      <br /><br />
    </Form>
  );
}