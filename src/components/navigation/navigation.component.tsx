import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./navigation.module.scss";

const Navigation: React.FC = () => {
  return (
    <div className={classes.navigation}>
      <NavLink
        className={({ isActive }) => (isActive ? classes.active : "")}
        to="/home"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? classes.active : "")}
        to="/heroes"
      >
        Heroes
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? classes.active : "")}
        to="/search"
      >
        Search
      </NavLink>
    </div>
  );
};

export default Navigation;
