import logo from "./logo.svg";
import "./App.css";

import { AppRouter } from "./routers/AppRouter";
import { useState } from "react";
import { UserContext } from "./hooks/UserContext";

function App() {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppRouter />
    </UserContext.Provider>
  );
}

export default App;
