import React, { useCallback, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import app from './firebase';

const Register = ({ history }) => {
  const [error, setError] = useState('');

  const handleRegister = useCallback(async event => {
    event.preventDefault();
    const { email, password, reenterPassword } = event.target.elements;
    let validated = handleValidation(email.value, password.value, reenterPassword.value);
    if (!validated) { return }

    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [history]);

  const handleValidation = (email, password, reenterPassword) => {
    if (!email || !password || !reenterPassword) {
      setError('You must fill in all fields');
      return false;
    }
    if(password !== reenterPassword) {
      setError('Passwords must match');
      return false;
    }
  }

  return (
    <div>
      <h1>Register</h1>
      {error ? (
        <p>{error}</p>
      ) : null
      }
      <form onSubmit={handleRegister}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <label>
          Re-enter Password
          <input name="reenterPassword" type="password" placeholder="Re-enter Password" />
        </label>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default withRouter(Register);