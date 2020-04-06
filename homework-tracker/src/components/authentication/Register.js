import React, { useCallback, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import app from './firebase';
import Logo from '../../assets/Logo.png';

const Register = ({ history }) => {
  const [error, setError] = useState('');

  const handleRegister = useCallback(async event => {
    event.preventDefault();
    const { email, password, reenterPassword } = event.target.elements;
    let validated = handleValidation(email.value, password.value, reenterPassword.value);
    if (!validated) {
      return
    } else {
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
        history.push('/sendVerification');
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setError('The email address is already in use');
        }
        console.log(error);
      }
    }
  }, [history]);

  const handleValidation = (email, password, reenterPassword) => {
    if (!email || !password || !reenterPassword) {
      setError('You must fill in all fields');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (password !== reenterPassword) {
      setError('Passwords must match');
      return false;
    }
    return true;
  }

  return (
    <div className="auth__container Register">
      <img className="auth__logo" src={Logo} alt="Homework Helper Logo" />
      <div className="auth__form-wrapper">
        <h1>Register</h1>
        <div className="auth__error">
          {error ? (
            <p>{error}</p>
          ) : null
          }
        </div>
        <form onSubmit={handleRegister}>
          <input name="email" type="email" placeholder="Email" aria-label="Email" />
          <input name="password" type="password" placeholder="Password" aria-label="Password" />
          <input name="reenterPassword" type="password" placeholder="Re-enter password" aria-label="Re-enter Password" />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default withRouter(Register);