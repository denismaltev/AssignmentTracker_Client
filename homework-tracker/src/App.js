import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyAssignments from "./components/MyAssignments";
import AddAssignment from "./components/AddAssignment";
import EditAssignment from "./components/EditAssignment";
import DeleteAssignment from "./components/DeleteAssignment";
import Login from "./components/authentication/Login";
import NavBar from "./components/NavBar";
import Register from "./components/authentication/Register";
import SendVerification from "./components/authentication/SendVerification";
import PrivateRoute from "./components/authentication/PrivateRoute";
import PrivateRouteNotVerified from "./components/authentication/PrivateRouteNotEmailVerified";
import { AuthProvider } from "./components/authentication/Auth";
import VerifyEmail from "./components/authentication/VerifyEmail";
import EmailNotVerified from "./components/authentication/EmailNotVerified";
import ForgotPassword from "./components/authentication/ForgotPassword";
import ResetPassword from "./components/authentication/ResetPassword";
import RedirectEmailLink from "./components/authentication/RedirectEmailLink";

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
            <PrivateRoute exact path="/delete" component={DeleteAssignment} />
            <PrivateRouteNotVerified
              exact
              path="/sendVerification"
              component={SendVerification}
            />
            <PrivateRouteNotVerified
              path="/verifyEmail"
              component={VerifyEmail}
            />
            <PrivateRouteNotVerified
              exact
              path="/notVerified"
              component={EmailNotVerified}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route exact path="/resetPassword" component={ResetPassword} />
            <Route exact path="/redirectEmail" component={RedirectEmailLink} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
