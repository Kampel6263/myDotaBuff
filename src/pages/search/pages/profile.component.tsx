import React, { useEffect } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import Heroes from "./heroes/heroes.component";
import Histograms from "./histograms/histograms.component";
import HomeProfile from "./home-profile/home-profile.component";
import Matches from "./matches/matches.component";
import classes from "./profile.module.scss";
import WardMap from "./ward-map/ward-map.component";

const Profile = () => {
  const location = useLocation();

  let id = location.pathname.split("/")[2];
  console.log("render");
  return (
    <div>
      <div className={classes.profileNavigation}>
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
      <Routes>
        <Route path="/" element={<HomeProfile id={id} />} />
        <Route path="/heroes" element={<Heroes id={id} />} />
        <Route path="/matches" element={<Matches id={id} />} />
        <Route path="/wardmap" element={<WardMap id={id} />} />
        <Route path="/histograms" element={<Histograms id={id} />} />
      </Routes>
    </div>
  );
};

export default Profile;
