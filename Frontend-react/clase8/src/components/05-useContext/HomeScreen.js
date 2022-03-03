import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export const HomeScreen = () => {
  const { user } = useContext(UserContext);

  // const user = { id: 12345, name: "Tamy Vivas" };
  return (
    <div>
      <h1>Home Screen</h1>
      <hr />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};
