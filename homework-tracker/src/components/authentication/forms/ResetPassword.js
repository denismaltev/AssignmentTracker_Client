import React, {useState, useCallback} from 'react';
import { withRouter, Link } from 'react-router-dom';
import app from '../firebase';
import Logo from '../../../assets/Logo.png';

const ResetPassword = ({ history, location }) => {
  const [error, setError] = useState('');

  const handleResetPassword = useCallback(
    async event => {
      event.preventDefault();
      const { newPassword, reenterPassword } = event.target.elements;
      let validated = handleValidation(newPassword.value, reenterPassword.value);
      if (!validated) { return }

      try {
        await app
          .auth()
          .confirmPasswordReset(location.state.oobCode, newPassword.value);
        console.log("Password has been reset");
        history.push("/");
      } catch (error) {
        console.log(error.code)
      }
    },
    [history, location.state.oobCode]
  );

  const handleValidation = (password, reenterPassword) => {
    if (!password || !reenterPassword) {
      setError('You must fill in all fields');
      return false;
    }
    if (password !== reenterPassword) {
      setError('Passwords must match');
      return false;
    }
    return true;
  }

  return (
    <div className="auth__container ResetPassword">
      <img className="auth__logo" src={Logo} alt="Homework Helper Logo" />
      <div className="auth__form-wrapper">
        <h1>Reset Password</h1>
        <p className="auth__message">Please enter your new password</p>
        <div className="auth__error">
          {error ? (
            <p>{error}</p>
          ) : null
          }
        </div>
        <form onSubmit={handleResetPassword}>
          <input name="newPassword" type="password" placeholder="New password" aria-label="Password" />
          <input name="reenterPassword" type="password" placeholder="Re-enter password" aria-label="Re-enter pasword" />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};


export default withRouter(ResetPassword);