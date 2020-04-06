import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyAssignments from "./components/MyAssignments";
import AddAssignment from "./components/AddAssignment";
import EditAssignment from "./components/EditAssignment";
import Login from "./components/authentication/forms/Login";
import NavBar from "./components/NavBar";
import Register from "./components/authentication/forms/Register";
import SendVerification from './components/authentication/messages/SendVerification';
import PrivateRoute from "./components/authentication/PrivateRoute";
import PrivateRouteNotVerified from "./components/authentication/PrivateRouteNotEmailVerified";
import { AuthProvider } from "./components/authentication/Auth";
import VerifyEmail from "./components/authentication/messages/VerifyEmail";
import EmailNotVerified from "./components/authentication/messages/EmailNotVerified";
import ForgotPassword from "./components/authentication/forms/ForgotPassword";
import ResetPassword from "./components/authentication/forms/ResetPassword";
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
            <PrivateRouteNotVerified exact path="/sendVerification" component={SendVerification} />
            <Route exact path="/verifyEmail" component={VerifyEmail} />
            <PrivateRouteNotVerified exact path="/notVerified" component={EmailNotVerified} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route exact path="/resetPassword" component={ResetPassword} />
            <Route path="/redirectEmail" component={RedirectEmailLink} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
