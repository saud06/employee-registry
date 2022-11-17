import { Link } from 'react-router-dom';
import Account from "./Account";
import classes from "./styles/Nav.module.css";

export default function Nav(){
  return(
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/employee" className={classes.brand}>
            <h3>Employee Registry</h3>
          </Link>
        </li>
      </ul>

      <Account />
    </nav>
  );
}