import React, { useEffect, useState } from "react";
import "./effects.css";
import { Message } from "./Message";

export const SimpleForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
  });

  const { name, email } = formState;

  const handleInputChange = (e) => {
    //console.log(">>", e);
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect

  useEffect(() => {
    console.log("useEffect 1st time render");
  }, []);

  useEffect(() => {
    console.log("useEffect when formState changed");
  }, [formState]);

  useEffect(() => {
    console.log("useEffect when email changed");
  }, [email]);

  return (
    <>
      <h1>useEffect</h1>
      <hr />

      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Tu nombre"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="email"
          className="form-control"
          placeholder="Tu email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
      </div>
      {name === "123" && <Message />}
    </>
  );
};
