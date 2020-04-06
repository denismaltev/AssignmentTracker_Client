import React from 'react';
import { withRouter } from 'react-router-dom';
import Message from './Message';

const EmailNotVerified = ({ history, location }) => {

  const resendCode = () => {
    history.push('/sendVerification');
  }

  return (
    <div>
      <Message
      title="Can't Access Page"
      message="Please verify your account through the verification link sent to your email. Or, click the link below to re-send the verification link." />
      <button onClick={resendCode}>Resend Verification Email</button>
    </div>
  );
}

export default withRouter(EmailNotVerified);