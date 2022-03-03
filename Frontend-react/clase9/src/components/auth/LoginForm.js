import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../helpers/auth";

import { useForm } from "../../hooks/useForm";
import { NavBar } from "../NavBar";

export const LoginForm = ({ history }) => {
  const navigate = useNavigate(); //hook for navbar

  const [error, setError] = useState(false);
  const [values, handleInputChange] = useForm({
    email: "user1@bdgsa.net",
    password: "user1",
  });

  const { email, password } = values;

  const handleLogin = async (e) => {
    e.preventDefault();
    //console.log(email, password, values);

    const result = await login(email, password);
    if (result) {
      navigate("/home", { replace: true }); // replace true prevent to back to previous page
    } else {
      setError(true);
    }
  };

  return (
    <>
      <NavBar />
      <form>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <p className="help is-danger">{error && "Invalid credentials"}</p>
          <div className="control">
            <button className="button is-link" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
