import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { State } from "../../../../business-logic/redux/config";
import {
  getheroes,
  getProfile,
  getProfileRecentMatches,
} from "../../../../business-logic/redux/store";
import { HeroeProps } from "../../../heroes/heroes.component";
import { useHeroesData } from "../../../heroes/heroes.hook";
import classes from "./home-profile.module.scss";

type ProfileProps = {
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

type allProfileProps = {
  tracked_until: string;
  solo_competitive_rank: string;
  competitive_rank: string;
  rank_tier: number;
  leaderboard_rank: number;
  mmr_estimate: { estimate: number };
  profile: ProfileProps;
};

type ProfileRecentMatches = {
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

const HomeProfile: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();

  const { profile, profileRecentMatches, heroes } = useSelector(
    (
      state: State
    ): {
      profile: allProfileProps;
      profileRecentMatches: ProfileRecentMatches[];
      heroes: HeroeProps[];
    } => state.general
  );

  const { heroesImg } = useHeroesData();

  useEffect(() => {
    if (id) {
      dispatch(getProfile(Number(id)));
      dispatch(getProfileRecentMatches(Number(id)));
    } else {
    }
  }, []);
  // console.log(
  //   profileRecentMatches[0]?.start_time + profileRecentMatches[1]?.start_time
  // );
  // console.log(profileRecentMatches.sort((a, b) => a.deaths - b.deaths));

  return (
    <div>
      {profile.profile ? (
        <div>
          <img src={profile?.profile?.avatarfull} alt="" />
          <div>Nick name: {profile?.profile?.personaname} </div>
          <div> MMR: {profile?.mmr_estimate?.estimate} </div>
          <div className={classes.matches}>
            {profileRecentMatches ? (
              [...profileRecentMatches]
                .sort((a, b) => {
                  if (a.start_time < b.start_time) {
                    return 1;
                  }
                  if (a.start_time > b.start_time) {
                    return -1;
                  }
                  return 0;
                })
                .map((el, i) => (
                  <div key={i} className={classes.recentTatches}>
                    <div className={classes.img}>
                      <img
                        src={
                          heroesImg?.filter((img) => img.id === el.hero_id)[0]
                            ?.src
                        }
                        alt=""
                      />
                      <div
                        className={
                          !el.win
                            ? classNames(classes.heroName, classes.win)
                            : classes.heroName
                        }
                      >
                        {
                          heroes.filter((itm) => itm.id === el.hero_id)[0]
                            ?.localized_name
                        }
                      </div>
                      <div>Normal skill</div>
                    </div>

                    <div>
                      <div>{el.start_time}</div>
                      <div>
                        KDA: {el.kills}/{el.deaths}/{el.assists}
                      </div>
                    </div>
                    <div>
                      Gpm: {el.gold_per_min}
                      <br />
                      Xpm: {el.xp_per_min}
                    </div>
                    <div>
                      Damage: {el.hero_damage} <br /> Tower Damage:{" "}
                      {el.tower_damage}
                    </div>
                    <div>Crips: {el.last_hits}</div>
                  </div>
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
