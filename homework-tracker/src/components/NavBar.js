import React, {useContext} from 'react';
import app from './authentication/firebase';
import {AuthContext} from './authentication/Auth';

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);

  return ( 
    <div>
      {(currentUser) ? (
        <button onClick={() => app.auth().signOut()}>Logout</button>
      ) : null
      }
    </div>
   );
}
 
export default NavBar;