import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import app from '../firebase';
import Message from '../Message';
import {AuthContext} from '../Auth';

const VerifyEmail = ({ history, location }) => {
  const [verified, setVerified] = useState(false);
  const { currentUser } = useContext(AuthContext);

  if (!verified) {
    try {
      app.auth().applyActionCode(location.state.oobCode);
      setVerified(true);
    } catch (error) {
      console.log(error.code);
    }
  }
  
  const redirectToLogin = () => {
    if(currentUser) {
      app.auth().signOut();
    } 
    history.push('/login');
  }

  setTimeout(() => redirectToLogin(), 4000)

  return (
    <div>
      {
        !verified ? (
          <Message
            title="Verifying Email Address"
            message="Please wait while we verify your email address" />
        ) : (
            <div>
              <Message
                title="Your email has been successfully verified"
                message="You will be redirected to the login page automatically, or click the button below"
                buttonText="Go to Login Page"
                buttonOnClick={redirectToLogin} />
            </div>
          )
      }
    </div>
  );
}

export default withRouter(VerifyEmail);