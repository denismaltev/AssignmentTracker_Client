import React from 'react';
import { withRouter } from 'react-router-dom';
import app from './firebase';
import Message from './Message';

const VerifyEmail = ({ history, location }) => {
  try {
    app.auth().applyActionCode(location.state.oobCode).then(() => {
      history.push('/')
    });
  } catch (error) {
    console.log(error.code);
  }

  return (
    <div>
      <Message
      title="Verifying Email Address"
      message="Please wait while we verify your email address" />
    </div>
  );
}

export default withRouter(VerifyEmail);