import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../business-logic/redux/config";
import { HeroeProps } from "../../../heroes/heroes.component";
import {
  allProfileProps,
  ProfileRecentMatches,
} from "./home-profile.component";

const UseHomeProfileData = () => {
  const { profile, profileRecentMatches, heroes } = useSelector(
    (
      state: State
    ): {
      profile: allProfileProps;
      profileRecentMatches: ProfileRecentMatches[];
      heroes: HeroeProps[];
    } => state.general
  );

  let maxDuration = profileRecentMatches.reduce(function (a, b) {
    return Math.max(a, b.duration);
  }, 0);

  return { profile, profileRecentMatches, heroes, maxDuration };
};

export { UseHomeProfileData };
