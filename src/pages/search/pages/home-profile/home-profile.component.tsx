import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  getProfile,
  getProfileRecentMatches,
} from "../../../../business-logic/redux/store";
import { useHeroesData } from "../../../heroes/heroes.hook";
import classes from "./home-profile.module.scss";

import { UseHomeProfileData } from "./home.hook";
import MatchItem from "../../../../components/match-item/match-item.component";

export type ProfileProps = {
  account_id: number;
  personaname: string;
  name: string;
  plus: boolean;
  cheese: number;
  steamid: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  profileurl: string;
  last_login: string;
  loccountrycode: string;
  is_contributor: boolean;
};

export type allProfileProps = {
  tracked_until: string;
  solo_competitive_rank: string;
  competitive_rank: string;
  rank_tier: number;
  leaderboard_rank: number;
  mmr_estimate: { estimate: number };
  profile: ProfileProps;
};

export type ProfileRecentMatches = {
  assists: number;
  cluster: number;
  deaths: number;
  duration: number;
  game_mode: number;
  gold_per_min: number;
  hero_damage: number;
  hero_healing: number;
  hero_id: number;
  is_roaming: any;
  kills: number;
  lane: any;
  lane_role: any;
  last_hits: number;
  leaver_status: number;
  lobby_type: number;
  match_id: number;
  party_size: any;
  player_slot: number;
  radiant_win: true;
  skill: any;
  start_time: number;
  tower_damage: number;
  version: any;
  xp_per_min: number;
  win?: boolean;
};

type HomeProfileProps = {
  id: string;
};

const HomeProfile: React.FC<HomeProfileProps> = ({ id }) => {
  const dispatch = useDispatch();

  const { profileRecentMatches, profile, maxDuration } = UseHomeProfileData();

  useEffect(() => {
    if (id) {
      dispatch(getProfile(Number(id)));
      dispatch(getProfileRecentMatches(Number(id)));
    }
  }, []);

  return (
    <div>
      {profile.profile ? (
        <div>
          <img src={profile?.profile?.avatarfull} alt="" />
          <div>Nick name: {profile?.profile?.personaname} </div>
          <div> MMR: {profile?.mmr_estimate?.estimate} </div>
          <div className={classes.matches}>
            {profileRecentMatches ? (
              profileRecentMatches.map((el, i) => (
                <MatchItem
                  matchDetails={el}
                  maxDuration={maxDuration}
                  key={i}
                />
              ))
            ) : (
              <div>Recent matches was not found</div>
            )}
          </div>
        </div>
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
};

export default HomeProfile;
