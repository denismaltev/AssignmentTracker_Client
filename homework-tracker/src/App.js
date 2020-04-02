import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MyAssignments from "./components/MyAssignments";
import Login from './components/authentication/Login';
import NavBar from "./components/NavBar";
import Register from "./components/authentication/Register";
import PrivateRoute from "./components/authentication/PrivateRoute";
import {AuthProvider} from './components/authentication/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <NavBar />
          <Switch>
            <PrivateRoute exact path="/" component={MyAssignments} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}
 
export default App;
