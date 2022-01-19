import React, { useEffect } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import Heroes from "./heroes/heroes.component";
import HomeProfile from "./home-profile/home-profile.component";
import Matches from "./matches/matches.component";
import classes from "./profile.module.scss";

const Profile = () => {
  const location = useLocation();

  let id = location.pathname.split("/")[2];

  return (
    <div>
      <div className={classes.profileNavigation}>
        <NavLink className={({ isActive }) => (isActive ? "" : "")} to={``}>
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "" : "")}
          to={`heroes`}
        >
          Heroes
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "" : "")}
          to={`matches`}
        >
          Matches
        </NavLink>
      </div>
      <Routes>
        <Route path="/" element={<HomeProfile id={id} />} />
        <Route path="/heroes" element={<Heroes />} />
        <Route path="/matches" element={<Matches id={id} />} />
      </Routes>
    </div>
  );
};

export default Profile;
