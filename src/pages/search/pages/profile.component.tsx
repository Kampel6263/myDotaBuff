import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  getPlayerHeroes,
  getProfile,
  getProfileMatches,
} from "../../../business-logic/redux/store";
import ActivitiCalendar from "../../../components/activiti-calendar/activiti-calendar.component";
import Preloader from "../../../components/preloader/preloader.coponent";
import ProfileHeader from "../../../components/profile-header/profile-header.component";
import { PreloaderEnum } from "../../../types/preloader";
import Heroes from "./heroes/heroes.component";
import Histograms from "./histograms/histograms.component";
import HomeProfile from "./home-profile/home-profile.component";

import Matches from "./matches/matches.component";
import { UseProfileData } from "./profile.hook";
import classes from "./profile.module.scss";
import WardMap from "./ward-map/ward-map.component";

const Profile = () => {
  const location = useLocation();

  let id = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getProfileMatches({ id: Number(id), count: 100 }));
      dispatch(getProfile(Number(id)));
      dispatch(getPlayerHeroes({ id: id, limit: 100 }));
    }
  }, [id]);

  const { profileRecentMatches, profile, showPreloader, playerHeroes } =
    UseProfileData();

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
      {showPreloader === PreloaderEnum.Profile ||
      !profile?.profile ||
      !profileRecentMatches[0]?.match_id ? (
        <Preloader />
      ) : (
        <ProfileHeader />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <HomeProfile
              id={id}
              profileRecentMatches={profileRecentMatches}
              profile={profile}
              playerHeroes={playerHeroes}
            />
          }
        />
        <Route
          path="/heroes"
          element={<Heroes playerHeroes={playerHeroes} />}
        />
        <Route
          path="/matches"
          element={
            <Matches id={id} profileRecentMatches={profileRecentMatches} />
          }
        />
        <Route path="/wardmap" element={<WardMap id={id} />} />
        <Route path="/histograms" element={<Histograms id={id} />} />
      </Routes>
    </div>
  );
};

export default React.memo(Profile);
