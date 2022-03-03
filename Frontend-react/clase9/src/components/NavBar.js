import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../helpers/auth";

export const NavBar = () => {
  //const { user, setUser } = useContext(UserContext);

  const loggedIn = isLoggedIn();
  const navigate = useNavigate(); //hook for navbar

  const onLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login", { replace: true }); // replace true prevent to back to previous page
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Job Board
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {loggedIn && (
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
            )}
            {loggedIn && (
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " activated" : "")
                }
                to="/jobs/new"
              >
                Post Job
              </NavLink>
            )}

            {!loggedIn && (
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " activated" : "")
                }
                to="/login"
              >
                Login
              </NavLink>
            )}

            {loggedIn && (
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " activated" : "")
                }
                to="/logout"
                onClick={onLogout}
              >
                Logout
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
