import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import app from "./firebase";
import { AuthContext } from "./Auth.js";
import Logo from '../../assets/Logo.png';

const Login = ({ history }) => {
  const [error, setError] = useState('');

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      let validated = handleValidation(email.value, password.value);
      if (!validated) { return }

      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const handleValidation = (email, password) => {
    if (!email || !password) {
      setError('You must fill in all fields');
      return false;
    }
    return true;
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    console.log(app.auth().currentUser.getIdToken())
    return <Redirect to="/" />;
  }

  return (
    <div className="auth__container Login">
      <img className="auth__logo" src={Logo} alt="Homework Helper Logo" />
      <div className="auth__form-wrapper">
        <h1>Login</h1>
        {error ? (
          <p>{error}</p>
        ) : null
        }
        <form onSubmit={handleLogin}>
          <input name="email" type="email" placeholder="Email" aria-label="Email" />
          <input name="password" type="password" placeholder="Password" aria-label="Password" />
          <button type="submit">Login</button>
        </form>
        <p>Not a member? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default withRouter(Login);
