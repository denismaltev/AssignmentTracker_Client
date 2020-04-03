import React from 'react';
import app from './authentication/firebase';

const NavBar = () => {
  return ( 
    <div>
      <img src="../assets/Logo.png" alt="Homework Helper Logo"/>
      <button onClick={() => app.auth().signOut()}>Logout</button>
    </div>
   );
}
 
export default NavBar;