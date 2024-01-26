import { useState } from "react";
import "./SignUpForm.css";

import { useNavigate } from "react-router-dom";


const DEFAULT_FORM_DATA = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: ""
};

/** SignUpForm: Registers user.
 *
 *  Props:
 *  - handleSignUp(): function to call in parent
 *
 *  State:
 *  - formData
 *
 *  RoutesList -> SignUpForm -> Alert
 */

// FIXME: here's a fix!
function SignUpForm({ handleSignUp, handleErrors = [], userData = DEFAULT_FORM_DATA}) {
  const [formData, setFormData] = useState(userData);
  const { username, password, firstName, lastName, email } = formData;


  // FIXME: here's a fix!
  const navigate = useNavigate();

  console.log('handleErrors: ', handleErrors);

  /** Updates form values with user input */
  function handleChange(evt) {
    const field = evt.target;
    setFormData(fData => ({
      ...fData,
      [field.name]: field.value
    }));
  }

  /** Calls parent function and clears form */
  function handleSubmit(evt) {
    evt.preventDefault();


    handleSignUp(formData);
    setFormData(userData);

    // FIXME: here's a fix!
    handleErrors.length = 0;

    // FIXME: here's a fix!
    // navigate("/");
  }

  return (
    <div className="SignUpForm-wrapper">
      <form className="SignUpForm" onSubmit={handleSubmit}>

        <div className="SignUpForm-username">
          <label htmlFor="SignUpForm-input-username">Username: </label>
          <input
            id="SignUpForm-input-username"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={username}
            aria-label="Username"
            required
          />
        </div>
        <div className="SignUpForm-password">
          <label htmlFor="SignUpForm-input-password">Password: </label>
          <input
          // FIXME: added type password
            type="password"
            id="SignUpForm-input-password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
            aria-label="Password"
            required
          />
        </div>
        <div className="SignUpForm-firstName">
          <label htmlFor="SignUpForm-input-firstName">First Name: </label>
          <input
            id="SignUpForm-input-firstName"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            value={firstName}
            aria-label="firstName"
            required
          />
        </div>
        <div className="SignUpForm-lastName">
          <label htmlFor="SignUpForm-input-lastName">Last Name: </label>
          <input
            id="SignUpForm-input-lastName"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            value={lastName}
            aria-label="lastName"
            required
          />
        </div>
        <div className="SignUpForm-email">
          <label htmlFor="SignUpForm-input-email">Email: </label>
          <input
            id="SignUpForm-input-email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={email}
            aria-label="Email"
            required
          />
        </div>

        {/* FIXME: here's a fix! */}
        {handleErrors.length > 0 &&
          <p>{handleErrors.toString()}</p>
        }

        <button className="SignUpForm-signup-btn">SUBMIT</button>

      </form>
    </div>

  );
}


export default SignUpForm;