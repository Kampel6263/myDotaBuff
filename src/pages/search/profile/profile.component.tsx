import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { State } from "../../../business-logic/redux/config";
import {
  getheroes,
  getProfile,
  getProfileRecentMatches,
} from "../../../business-logic/redux/store";
import { HeroeProps } from "../../heroes/heroes.component";
import classes from "./profile.module.scss";

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
};

const Profile = () => {
  // const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  let defaultLink =
    "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/";
  // const {profile} = useSelector(sta)

  const { profile, profileRecentMatches, heroes } = useSelector(
    (
      state: State
    ): {
      profile: allProfileProps;
      profileRecentMatches: ProfileRecentMatches[];
      heroes: HeroeProps[];
    } => state.general
  );

  useEffect(() => {
    let id = location.pathname.split("/")[4];
    if (id) {
      console.log(id, "id");
      dispatch(getheroes());
      dispatch(getProfile(Number(id)));
      dispatch(getProfileRecentMatches(Number(id)));
    } else {
    }
  }, []);

  const [state, setstate] = useState("");

  // useEffect(() => {
  //   if (heroes) {
  //     setstate(defaultLink + heroes.localized_name + ".png");
  //   }
  // }, [heroes]);

  console.log(state, "state");

  console.log(profileRecentMatches, "navigate");
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {profile.profile ? (
                <div>
                  {" "}
                  <img src={profile?.profile?.avatarfull} alt="" />
                  <div>Nick name: {profile?.profile?.personaname} </div>
                  <div> MMR: {profile?.mmr_estimate?.estimate} </div>
                  <div>Competive:{profile.competitive_rank}</div>
                  <div> Leaderboard:{profile.leaderboard_rank}</div>
                  {profileRecentMatches ? (
                    profileRecentMatches.map((el, i) => (
                      <div key={i} className={classes.recentTatches}>
                        <img
                          src={
                            defaultLink +
                            heroes
                              .filter((itm) => itm.id === el.hero_id)[0]
                              ?.localized_name.toLowerCase() +
                            ".png"
                          }
                          alt=""
                        />{" "}
                        <div>2</div>
                        <div>
                          {
                            heroes.filter((itm) => itm.id === el.hero_id)[0]
                              ?.localized_name
                          }
                        </div>
                        <div>{el.kills}</div>
                      </div>
                    ))
                  ) : (
                    <div>Recent matches was not found</div>
                  )}
                </div>
              ) : (
                <div>User not found</div>
              )}
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default Profile;
