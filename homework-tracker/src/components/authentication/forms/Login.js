import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import app from "../firebase";
import { AuthContext } from "../Auth.js";
import Logo from '../../../assets/Logo.png';

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
        if(error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          setError("Invalid email or password")
        }
        console.log(error.code)
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
    return <Redirect to="/" />;
  }

  return (
    <div className="auth__container Login">
      <img className="auth__logo" src={Logo} alt="Homework Helper Logo" />
      <div className="auth__form-wrapper">
        <h1>Login</h1>
        <div className="auth__error">
          {error ? (
            <p>{error}</p>
          ) : null
          }
        </div>
        <form onSubmit={handleLogin}>
          <input name="email" type="email" placeholder="Email" aria-label="Email" />
          <input name="password" type="password" placeholder="Password" aria-label="Password" />
          <button type="submit">Login</button>
        </form>
        <p className="auth__link">Not a member? <Link to="/register">Register</Link></p>
        <p className="auth__link"><Link to="/forgotPassword">Forgot Password?</Link></p>
      </div>
    </div>
  );
};

export default withRouter(Login);
