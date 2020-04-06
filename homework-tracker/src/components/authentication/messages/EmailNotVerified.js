import React from 'react';
import { withRouter } from 'react-router-dom';
import Message from '../Message';

const EmailNotVerified = ({ history, location }) => {

  const resendCode = () => {
    history.push('/sendVerification');
  }

  return (
    <div>
      <Message
      title="Can't Access Page"
      message="Please verify your account through the verification link sent to your email. Or, click the link below to re-send the verification link."
      buttonText="Re-send Verification Email"
      buttonOnClick={resendCode} />
    </div>
  );
}

export default withRouter(EmailNotVerified);