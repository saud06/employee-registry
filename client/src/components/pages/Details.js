import _ from 'lodash';
import moment from 'moment';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useComments from '../../hooks/useComments';
import useEmployeeDetails from '../../hooks/useEmployeeDetails';
import Comments from '../Comments';
import classes from '../styles/Details.module.css';

export default function Details() {
  const {id} = useParams();
  const {currentUser} = useAuth();
  const {loader, error, employeeDetails} = useEmployeeDetails(id);
  const {commentLoader, commentError, comments} = useComments(id);
  const commentAdditionalData = [currentUser.data.id, id] // commented by & commented to

  return !currentUser.cookie && _.size(currentUser.data) === 0 ? (
    <Navigate to='/' />
  ) : (
    <div className="">
      <h1>Employee Details</h1>

      {loader && <div>Loading...</div>}
      {error && <div>There was an error !</div>}

      {/* Employee details */}
      <>
        <Card className={classes.card}>
          <Card.Body>
            {!loader && !error && employeeDetails && (
              <>
                <Card.Title>{employeeDetails.fname} {employeeDetails.lname}</Card.Title>

                <Card.Subtitle className="mb-2 text-muted">{_.upperFirst(employeeDetails.role)}</Card.Subtitle>
                
                <Card.Text>
                  <strong>Username</strong>: {employeeDetails.username} <br />
                  <strong>Email</strong>: {employeeDetails.email} <br />
                  <strong>Address</strong>: {employeeDetails.address ? employeeDetails.address.slice(0, -2) : '(Not available)'}
                </Card.Text>
              </>
            )}

            {!loader && !employeeDetails && (
              <Card.Text>Employee details not found !</Card.Text>
            )}
          </Card.Body>
        </Card>
      </>

      {commentLoader && <div>Loading...</div>}
      {commentError && <div>There was an error !</div>}
      
      {/* Employee comments */}
      <>  
        <Card>
          <Card.Header>Comments</Card.Header>

          <ListGroup variant="flush">
            <ListGroup.Item><Comments commentAdditionalData={commentAdditionalData} /></ListGroup.Item>
            
            {!commentLoader && !commentError && comments && comments.length > 0 && (
              comments.map(cmnt =>
                cmnt.commentedTo.id === id.trim() && (
                  <ListGroup.Item key={cmnt._id}>{cmnt.text} <small><Badge bg="light" text="dark">by {cmnt.commentedBy.name} at {moment(cmnt.datetime).format('YYYY-MM-DD hh:mm a')}</Badge></small></ListGroup.Item>
                )
              )
            )}

            {!commentLoader && comments.length === 0 && (
              <ListGroup.Item>Comments not found !</ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </>
    </div>
  );
}