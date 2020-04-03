import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import app from "./firebase";
import { AuthContext } from "./Auth.js";

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
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
		console.log(app.auth().currentUser.getIdToken())
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Login</h1>
			{error ? (
        <p>{error}</p>
      ) : null
      }
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Login</button>
      </form>
			<p>Not a member? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default withRouter(Login);
