import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Message from './Message';

const RedirectEmailLink = ({ history, location }) => {
  const query = new URLSearchParams(location.search);
  const oobCode = query.get('oobCode')
  const mode = query.get('mode');
  let redirect = null;

  if (mode === 'verifyEmail') {
    redirect = (
      <Redirect
        to={{
          pathname: "/verifyEmail",
          state: { oobCode: oobCode }
        }}
      />
    );
  }
  if (mode === 'resetPassword') {
    redirect = (
      <Redirect
        to={{
          pathname: "/resetPassword",
          state: { oobCode: oobCode }
        }}
      />
    );
  }

  return (
    <div>
      {
        redirect !== null ? (
          redirect
        ) : (
            <Message
              title="Redirecting..."
              message="Please wait while we redirect you to the right page" />
          )
      }
    </div>
  );
}

export default withRouter(RedirectEmailLink);