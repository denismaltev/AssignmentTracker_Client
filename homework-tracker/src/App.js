import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MyAssignments from "./components/MyAssignments";
import Login from './components/authentication/Login';
import NavBar from "./components/NavBar";
import Register from "./components/authentication/Register";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={MyAssignments} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}
 
export default App;
