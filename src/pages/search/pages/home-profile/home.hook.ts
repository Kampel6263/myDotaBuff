import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../business-logic/redux/config";
import { HeroeProps } from "../../../heroes/heroes.component";
import {
  allProfileProps,
  ProfileRecentMatches,
} from "./home-profile.component";

type ProfileType = {
  profile: allProfileProps;
  winRate: {
    win: number;
    lose: number;
  };
};

const UseHomeProfileData = () => {
  const { profile, profileRecentMatches, heroes, showPreloader } = useSelector(
    (
      state: State
    ): {
      profile: ProfileType;
      profileRecentMatches: ProfileRecentMatches[];
      heroes: HeroeProps[];
      showPreloader: number | null;
    } => state.general
  );

  let maxDuration = profileRecentMatches.reduce(function (a, b) {
    return Math.max(a, b.duration);
  }, 0);

  return { profile, profileRecentMatches, heroes, maxDuration, showPreloader };
};

export { UseHomeProfileData };
