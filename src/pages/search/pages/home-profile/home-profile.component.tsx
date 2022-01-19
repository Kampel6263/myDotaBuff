import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Animated from "../../../../assets/animation/Blocks.svg";
import {
  getPlayerHeroes,
  getProfile,
  getProfileMatches,
  preloader,
} from "../../../../business-logic/redux/store";
import { useHeroesData } from "../../../heroes/heroes.hook";
import classes from "./home-profile.module.scss";

import { UseHomeProfileData } from "./home.hook";
import MatchItem from "../../../../components/match-item/match-item.component";
import Preloader from "../../../../components/preloader/preloader.coponent";
import { PreloaderEnum } from "../../../../types/preloader";
import { NavLink, useNavigate } from "react-router-dom";
import MostHeroItem from "../../../../components/most-hero-item/most-hero-item.component";

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
  const navigate = useNavigate();
  const {
    profileRecentMatches,
    profile,
    maxDuration,
    showPreloader,
    playerHeroes,
  } = UseHomeProfileData();

  // console.log(playerHeroes, "player heroes");
  useEffect(() => {
    if (id) {
      dispatch(getProfileMatches({ id: Number(id), count: 5 }));
      dispatch(getProfile(Number(id)));
      dispatch(getPlayerHeroes({ id: id, limit: 10 }));
    }
  }, [id]);

  const winRate = String(
    (profile.winRate?.win / (profile.winRate?.win + profile.winRate?.lose)) *
      100
  ).slice(0, 5);
  // console.log(playerHeroes);
  if (showPreloader === PreloaderEnum.Profile || !profile?.profile) {
    return <Preloader />;
  }
  return (
    <div>
      {profile?.profile?.profile?.account_id ? (
        <div>
          <div className={classes.header}>
            <img src={profile?.profile.profile?.avatarfull} alt="" />
            <div>ID: {profile.profile.profile.account_id}</div>
            <div>Nick name: {profile?.profile.profile?.personaname} </div>
            <div>MMR: {profile?.profile.mmr_estimate?.estimate} </div>
            <div>Win: {profile?.winRate.win}</div>
            <div>Lose: {profile?.winRate.lose}</div>

            <div
              style={{
                color: `rgb(${
                  255 * ((100 - Number(winRate)) / 100) +
                  (Number(winRate) / 100 < 0.5 ? 25 : -25)
                }, ${
                  255 * (Number(winRate) / 100) +
                  (Number(winRate) / 100 > 0.5 ? 25 : -25)
                }, 0 )`,
              }}
            >
              Win rate: {winRate}%
            </div>
          </div>
          <div className={classes.title}>Most played heroes</div>
          <div className={classes.playerHeroes}>
            <div className={classes.hero}>
              <div>Hero</div>
              <div>Matches</div>
              <div>Win</div>
              <div>Lose</div>
              <div>Win rate</div>
            </div>
            {playerHeroes.slice(0, 5).map((el, i) => (
              <MostHeroItem el={el} key={i} />
            ))}
          </div>
          <div
            className={classes.showMore}
            onClick={() => navigate(`/profile/${id}/heroes`)}
          >
            Show more
          </div>
          <div className={classes.title}>Recent matches</div>
          <div className={classes.matches}>
            {profileRecentMatches ? (
              profileRecentMatches
                .slice(0, 5)
                .map((el, i) => (
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
          <div
            className={classes.showMore}
            onClick={() => navigate(`/profile/${id}/matches`)}
          >
            Show more
          </div>
        </div>
      ) : (
        <div className={classes.notFound}>
          <img
            src="https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-19.jpg"
            alt=""
          />
          <div>User not found</div>
          <div onClick={() => navigate("/search")}>Back to Search page</div>
        </div>
      )}
    </div>
  );
};

export default HomeProfile;
