import React from "react";
import { useCounter } from "../../hooks/useCounter";
import "./counter.css";

export const CounterWithCustonHook = () => {
  const { state, increment, decrement, reset } = useCounter();
  return (
    <>
      <h1>Counter With Hook: {state}</h1>
      <hr />
      <button
        className="btn"
        onClick={() => {
          increment(10);
        }}
      >
        +1
      </button>
      <button
        className="btn"
        onClick={() => {
          decrement();
        }}
      >
        -1
      </button>
      <button className="btn" onClick={reset}>
        Reset
      </button>
    </>
  );
};
