import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="back1">
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="username"
          id="username"
          placeholder="username"
          required
          className="changeinput"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          minLength="8"
          placeholder="password"
          required
          className="changeinput"
        />
        <button className="submit-btn" value="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
