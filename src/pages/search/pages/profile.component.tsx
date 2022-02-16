import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  getItems,
  getPlayerHeroes,
  getProfile,
  getProfileMatches,
} from "../../../business-logic/redux/store";
import ActivitiCalendar from "../../../components/activiti-calendar/activiti-calendar.component";
import Preloader from "../../../components/preloader/preloader.coponent";
import ProfileHeader from "../../../components/profile-header/profile-header.component";
import ProfileNavigation from "../../../components/profile-navigation/profile-navigation.component";
import { useMedia } from "../../../core/hooks/media.hook";
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
  const [id, setId] = useState("");

  if (id !== location.pathname.split("/")[2]) {
    setId(location.pathname.split("/")[2]);
  }

  // let id = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getProfileMatches({ id: Number(id), count: 200 }));
      dispatch(getProfile(Number(id)));
      dispatch(getPlayerHeroes({ id: id, limit: 100 }));
    }
  }, [id]);

  const { profileRecentMatches, profile, showPreloader, playerHeroes } =
    UseProfileData();
  const { mobile } = useMedia();

  return (
    <div>
      <ProfileNavigation />
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
