import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import classes from './styles/Account.module.css';

export default function Account(){
  const {currentUser, logout} = useAuth();

  return (
    <div className={classes.account}>
        {
        currentUser.cookie && _.size(currentUser.data) > 0 ? 
          (
            <>
              <span className="material-icons-outlined" title="Account"> account_circle </span>
              <span>{currentUser.data.fname} {currentUser.data.lname}</span>
          
              <span className="material-icons-outlined" title="Logout" onClick={logout}> logout </span>
            </>
          ) : 
          (
            <>
              <span className="material-icons-outlined" title="Account"> account_circle </span>
              <Link to="/signup">Signup</Link>

              <span className="material-icons-outlined" title="Account"> login </span>
              <Link to="/login">Login</Link>
            </>
          )
        }
      </div>
  );
}