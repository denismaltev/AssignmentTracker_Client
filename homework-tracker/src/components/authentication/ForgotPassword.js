import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import app from './firebase';
import Message from './Message';

const ForgotPassword = ({ history }) => {
  const [error, setError] = useState('');
  let title = "Forgot Your Password?"
  let message = "Please enter your email address below to receive a password reset link"

  const sendPasswordResetLink = useCallback(
    async event => {
      event.preventDefault();
      const { email } = event.target.elements;
      let validated = handleValidation(email.value);
      if (!validated) { return }

      try {
        await app
          .auth()
          .sendPasswordResetEmail(email.value);
        history.push("/");
      } catch (error) {
        console.log(error.code)
      }
    },
    [history]
  );

  const handleValidation = (email) => {
    if (!email) {
      setError('Please fill in your email');
      return false;
    }
    return true;
  }

  return (
    <div>
      <Message title={title} message={message} />
      <div>
        {error ? (
          <p>{error}</p>
        ) : null
        }
      </div>
      <form onSubmit={sendPasswordResetLink}>
        <input name="email" type="email" placeholder="Email" aria-label="Email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default withRouter(ForgotPassword);