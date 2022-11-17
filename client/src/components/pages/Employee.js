import axios from 'axios';
import _ from 'lodash';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useEmployeeList from '../../hooks/useEmployeeList';
import EmployeeForm from '../EmployeeForm';
import ImportCSV from '../ImportCSV';
import classes from '../styles/Employee.module.css';

export default function Employee() {
  const {currentUser} = useAuth();
  const {loader, error, employees} = useEmployeeList();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [employeeData, setEmployeeData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = async (e) => {
    if(e){
      await axios
        .delete(`employees/delete/${deletedId}`)
        .then(response => console.log(response))
        .catch(err => console.log(err));

      window.location.reload();
    }
    
    setShow2(false);
  }
  const handleShow2 = () => setShow2(true);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  // Add employee handler
  const addEmployee = () => {
    setEmployeeData({});
    handleShow();
  }

  // Update employee handler
  const updateEmployee = (data) => {
    setEmployeeData(data);
    handleShow();
  }

  // Delete employee handler
  const deleteEmployee = async (id) => {
    setDeletedId(id);
    handleShow2();
  };

  // Import CSV file handler
  const importCSV = () => {
    handleShow3();
  }

  return !currentUser.cookie && _.size(currentUser.data) === 0 ? (
    <Navigate to='/' />
  ) : (
    <>
      <h1>Employee List</h1>
      <Button className={classes.add} variant='outline-info' onClick={() => addEmployee()}>Add Employee</Button>
      <Button className={classes.import} variant='outline-success' onClick={() => importCSV()}>Import CSV</Button>
      
      {loader && <div>Loading...</div>}
      {error && <div>There was an error !</div>}

      {!loader && !error && employees && employees.length > 0 && (
        <>
          <Table striped bordered hover className={classes.employeeTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                employees.map((emp, index) => 
                (
                  <tr key={emp._id}>
                    <td>{index+1}</td>
                    <td>{emp.fname}</td>
                    <td>{emp.lname}</td>
                    <td>
                      <Link to={`../../details/${emp._id}`}>
                        <Button className={classes.action} variant='outline-info'>Details</Button>
                      </Link>
                      <Button className={classes.action} variant='outline-success' onClick={() => updateEmployee(emp)}>Edit</Button>
                      <Button disabled={emp.role === 'admin'} className={classes.action} variant='outline-danger' onClick={() => deleteEmployee(emp._id)}>Delete</Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </>
      )}

      {!loader && employees.length === 0 && (
        <div className=''>No data found !</div>
      )}

      {/* Add / update employee */}
      <Modal show={show} onHide={handleClose} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Add / Update Employee</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EmployeeForm employeeData={employeeData} />
        </Modal.Body>
      </Modal>

      {/* Delete employee */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete this employee?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-danger" onClick={(e) => handleClose2(e)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Import CSV */}
      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Import Employee Using CSV</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ImportCSV />
        </Modal.Body>
      </Modal>
    </>
  );
}