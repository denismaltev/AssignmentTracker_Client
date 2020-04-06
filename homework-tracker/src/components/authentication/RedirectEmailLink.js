import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Message from './Message';

const RedirectEmailLink = ({ history, location }) => {
  const [redirectReady, setRedirectReady] = useState(false);
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
    setRedirectReady(true);
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
    setRedirectReady(true);
  }

  return (
    <div>
      {
        redirectReady ? (
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