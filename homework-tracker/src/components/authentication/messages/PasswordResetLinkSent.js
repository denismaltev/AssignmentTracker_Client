import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import app from '../firebase';
import Message from '../Message';
import { AuthContext } from '../Auth';

const PasswordResetLinkSent = ({ history, location }) => {
  const { currentUser } = useContext(AuthContext);
  const title= "Password Reset Link Sent to Email";
  const message = "Please check your email for the password reset link. You will be redirected to the login page automatically, or click the button below."

  const redirectToLogin = () => {
    if (currentUser) {
      app.auth().signOut();
    }
    history.push('/login');
  }

  setTimeout(() => redirectToLogin(), 4000)

  return (
    <div>
      <Message
        title={title}
        message={message}
        buttonText="Go to Login Page"
        buttonOnClick={redirectToLogin} />

    </div>
  );
}

export default withRouter(PasswordResetLinkSent);