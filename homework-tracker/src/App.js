import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyAssignments from "./components/MyAssignments";
import AddAssignment from "./components/AddAssignment";
import EditAssignment from "./components/EditAssignment";
import Login from "./components/authentication/Login";
import NavBar from "./components/NavBar";
import Register from "./components/authentication/Register";
import PrivateRoute from "./components/authentication/PrivateRoute";
import { AuthProvider } from "./components/authentication/Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <NavBar />
          <Switch>
            <PrivateRoute exact path="/" component={MyAssignments} />
            <PrivateRoute exact path="/add" component={AddAssignment} />
            <PrivateRoute exact path="/edit" component={EditAssignment} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
