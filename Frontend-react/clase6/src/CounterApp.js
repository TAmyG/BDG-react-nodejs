import React, { useState } from "react";

const CounterApp = ({ value = 10 }) => {
  const [counter, setCounter] = useState(value);

  const handleAdd = (e) => {
    // setCounter(counter + 1);
    setCounter((c) => c + 1);
  };

  const handleReset = (e) => {
    setCounter(value);
  };

  const handleSus = (e) => {
    setCounter((c) => c - 1);
  };
  return (
    <div>
      <h1>CounterApp</h1>
      <h2> {counter} </h2>
      <button onClick={handleAdd}>+1</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleSus}>-1</button>
    </div>
  );
};

export default CounterApp;
