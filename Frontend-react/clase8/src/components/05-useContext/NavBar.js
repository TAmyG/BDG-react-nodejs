import React from "react";
import { Link, NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          useContext
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink
              className={({ isActive }) =>
                "nav-link" + (isActive ? " activated" : "")
              }
              aria-current="page"
              to="/"
              exact={`${true}`}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                "nav-link" + (isActive ? " activated" : "")
              }
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                "nav-link" + (isActive ? " activated" : "")
              }
              to="/login"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
