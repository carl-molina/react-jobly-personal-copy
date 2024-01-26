import { useState } from "react";
import "./LoginForm.css";


const DEFAULT_FORM_DATA = {
  username: "",
  password: ""
};

/** LoginForm: Logs in user.
 *
 *  Props:
 *  - handleLogin(): function to call in parent
 *
 *  State:
 *  - formData
 *
 *  RoutesList -> LoginForm -> Alert
 */

function LoginForm({ handleLogin }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  const { username, password } = formData;

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
    handleLogin(formData);
    setFormData(DEFAULT_FORM_DATA);
  }

  return (
    <div className="LoginForm-wrapper">
      <form className="LoginForm" onSubmit={handleSubmit}>
        <div className="LoginForm-username">
          <label htmlFor="LoginForm-input-username">Username: </label>
          <input
            id="LoginForm-input-username"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={username}
            aria-label="Username"
          />
        </div>
        <div className="LoginForm-password">
          <label htmlFor="LoginForm-input-password">Password: </label>
          <input
          // FIXME: added type password
          type="password"
            id="LoginForm-input-password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
            aria-label="Password"
          />
        </div>
        <button className="LoginForm-login-btn">SUBMIT</button> {/* test click */}
      </form>
    </div>

  );
}


export default LoginForm;