import React from "react";

import "./Register.css";

function Register() {
  return (
    <>
      <div className="back-2">
        <form>
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            placeholder="username"
            required
            className="changeinput"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="email"
            required
            className="changeinput"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            required
            className="changeinput"
          />
          <label htmlFor="confirm password">Confirm Password:</label>
          <input
            type="confirm"
            id="confirm"
            placeholder="Confirm Password"
            required
            className="changeinput"
          />

          <button className="btn-4">SIGN UP</button>
        </form>
      </div>
    </>
  );
}

export default Register;
