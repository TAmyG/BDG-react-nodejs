import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export const AboutScreen = () => {
  const { user, setUser } = useContext(UserContext);
  // const user = { id: 12345, name: "Tamy Vivas" };

  const handleClick = () => {
    setUser({});
    //console.log("setUser");
  };

  return (
    <div>
      <h1>About Screen</h1>
      <hr />
      <pre>{JSON.stringify(user, null, 3)}</pre>
      <button className="btn btn-warning" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};
