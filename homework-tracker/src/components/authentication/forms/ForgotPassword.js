import React, { useState, useCallback } from 'react';
import { withRouter, Link } from 'react-router-dom';
import app from '../firebase';
import Logo from '../../../assets/Logo.png';

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
        history.push("/passwordResetLinkSent");
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
    <div className="auth__container ForgotPassword">
      <img className="auth__logo" src={Logo} alt="Homework Helper Logo" />
      <div className="auth__form-wrapper">
        <h1>{title}</h1>
        <p className="auth__message">{message}</p>
        <div className="auth__error">
          {error ? (
            <p>{error}</p>
          ) : null
          }
        </div>
        <form onSubmit={sendPasswordResetLink}>
          <input name="email" type="email" placeholder="Email" aria-label="Email" />
          <button type="submit">Submit</button>
        </form>
        <p className="auth__link"><Link to="/login">Go back to login</Link></p>
      </div>
    </div>
  );
}

export default withRouter(ForgotPassword);