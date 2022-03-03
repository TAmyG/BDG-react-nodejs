import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { HookApp } from "./HookApp";
// import { CounterApp } from "./components/01-useState/CounterApp";
// import { CounterWithCustonHook } from "./components/01-useState/CounterWithCustonHook";
// import { SimpleForm } from "./components/02-useEffect/SimpleForm";
// import { FormWithCustomHook } from "./components/02-useEffect/FormWithCustomHook";
// import { MultipleCustomHooks } from "./components/03-examples/MultipleCustomHooks";
// import { FocusScreen } from "./components/03-useRef/FocusScreen";
// import { RealExampleRef } from "./components/04-useRef/RealExampleRef";
import { MainApp } from "./components/05-useContext/MainApp";

ReactDOM.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
