import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import app from './firebase';

const Register = ({ history }) => {
  const handleRegister = useCallback(async event => {
    event.preventDefault();
    const { email, password} = event.target.elements;
    try {
      await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [history]);

  return ( 
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
   );
}

export default withRouter(Register);