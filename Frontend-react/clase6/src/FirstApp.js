import React from "react";
import PropTypes from "prop-types";

const FirstApp = ({ greeting, subtitle }) => {
  return (
    <>
      <h1>{greeting}</h1>
      <p>{subtitle}</p>
    </>
  );
};

FirstApp.protoTypes = {
  greeting: PropTypes.string.isRequired,
};

FirstApp.defaultProps = {
  subtitle: "Im a subtitle",
};

export default FirstApp;
