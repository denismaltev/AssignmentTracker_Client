import React, { useContext } from 'react';
import app from './authentication/firebase';
import { AuthContext } from './authentication/Auth';
import { withRouter } from 'react-router-dom';

const NavBar = ({ history }) => {
  const { currentUser } = useContext(AuthContext);


  return (
    <div className="NavBar__container">
      <button className="NavBar__item" onClick={() => history.push('/')}>Home</button>
      {(currentUser) ? (
        <button className="NavBar__item" onClick={() => app.auth().signOut()}>Logout</button>
      ) : null
      }
    </div>
  );
}

export default withRouter(NavBar);