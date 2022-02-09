import classNames from "classnames";
import React, { useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useMedia } from "../../core/hooks/media.hook";
import classes from "./profile-navigation.module.scss";

const ProfileNavigation: React.FC = () => {
  const location = useLocation();
  const { mobile } = useMedia();
  const [menu, setMenu] = useState(false);
  const ref = useRef(null);

  return (
    <React.Fragment>
      {mobile && (
        <div className={classes.menu} onClick={() => setMenu(true)}>
          Menu &#62;
        </div>
      )}
      <div
        className={
          menu
            ? classNames(classes.profileNavigation, classes.show)
            : classes.profileNavigation
        }
        ref={ref}
        onClick={() => setMenu(false)}
      >
        {mobile && (
          <div onClick={() => setMenu(false)} className={classes.closeButton}>
            &times;
          </div>
        )}

        <NavLink
          className={({ isActive }) => {
            return location.pathname.split("/").length === 3 && isActive
              ? classes.active
              : "";
          }}
          to={``}
        >
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to={`heroes`}
        >
          Heroes
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to={`matches`}
        >
          Matches
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to={`wardmap`}
        >
          Ward map
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to={`histograms`}
        >
          Histograms
        </NavLink>
      </div>
    </React.Fragment>
  );
};

export default ProfileNavigation;
