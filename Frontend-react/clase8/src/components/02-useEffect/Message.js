import React, { useEffect, useState } from "react";

export const Message = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const { x, y } = coords;

  //   const mouseMove = (e) => {
  //     const coords = { x: e.x, y: e.y };
  //     setCoords(coords);
  //   };
  //   window.addEventListener("mousemove", mouseMove);
  //   console.log("component mounted");

  useEffect(() => {
    const mouseMove = (e) => {
      const coords = { x: e.x, y: e.y };
      console.log(coords);
      setCoords(coords);
    };
    window.addEventListener("mousemove", mouseMove);
    console.log("component mounted");

    return () => {
      console.log("component unmounted");
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div>
      <h3>Message Component</h3>
      <p>
        x: {x}, y: {y}
      </p>
    </div>
  );
};
