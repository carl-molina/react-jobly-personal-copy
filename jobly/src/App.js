import { BrowserRouter } from "react-router-dom";
import './App.css';
import { useState, useEffect } from "react";

import Navbar from "./Navbar";
import RoutesList from "./RoutesList";

import LoginForm from "./LoginForm";
import JoblyApi from "./api";

const DEFAULT_USER_DATA = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
}

/** Jobly App.
 *
 * Props: none
 *
 * State: none
 *
 * App -> { Navbar, RoutesList }
 */
function App() {

  // FIXME: here's a fix!
  const [userData, setUserData] = useState({DEFAULT_USER_DATA});
  const [signupLoginErrs, setSignupLoginErrs] = useState([]);

  console.log('signupLoginErrs: ', signupLoginErrs);

  /** signUp: Registers the user with the SignUpForm data.
   * On success, receives token, and stores token, user's username,
   *    first name, last name, and email in userData.
   *
   * On failure, receives error messages, and stores in state to pass to
   * SignUpForm.
   */


  // FIXME: here's a fix!
  async function signUp(formData) {
    const { username, password, firstName, lastName, email } = formData;
    const response = await JoblyApi
      .registerUser(username, password, firstName, lastName, email);

    if (response.username) {
      setUserData({
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
    } else {
      setSignupLoginErrs(errs => [...errs, response.errors]);
    }
  }


  /** login: Logins the user with the LoginForm data.
   *  On success, receives token.
   *  On failure, receives error messages, and stores in state to pass to
   *  LoginForm.
  */


  // FIXME: here's a fix!
  async function login(formData) {
    const { username, password } = formData;
    const { firstName, lastName, email, errors } = await JoblyApi.loginUser(username, password);

    if ( firstName ) {
      setUserData({
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
    } else {
      setSignupLoginErrs(errs => [...errs, errors]);
    }
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {/* FIXME: here's a fix! */}
        <RoutesList handleSignUp={signUp} handleLogin={login} handleErrors={signupLoginErrs}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
