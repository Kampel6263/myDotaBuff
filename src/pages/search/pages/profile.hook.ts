import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../business-logic/redux/config";
import { HeroeProps } from "../../heroes/heroes.component";

export type ProfileType = {
  profile: allProfileProps;
  winRate: {
    win: number;
    lose: number;
  };
};
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
export type playerHeroesType = {
  against_games: number;
  against_win: number;
  games: number;
  hero_id: string;
  last_played: number;
  win: number;
  with_games: number;
  with_win: number;
};

const UseProfileData = () => {
  const { profile, profileRecentMatches, heroes, showPreloader, playerHeroes } =
    useSelector(
      (
        state: State
      ): {
        profile: ProfileType;
        profileRecentMatches: ProfileRecentMatches[];
        heroes: HeroeProps[];
        showPreloader: number | null;
        playerHeroes: playerHeroesType[];
      } => state.general
    );

  let maxDuration = profileRecentMatches.reduce(function (a, b) {
    return Math.max(a, b.duration);
  }, 0);

  const gameToday = profileRecentMatches.filter(
    (el) =>
      dayjs.unix(el.start_time).format("DD/MM/YY") ===
      dayjs.unix(Date.now() / 1000).format("DD/MM/YY")
  );

  const winGame = gameToday?.filter((el) => el.win).length;

  const winRate =
    (profile.winRate?.win / (profile.winRate?.win + profile.winRate?.lose)) *
    100;

  const oldWinrate =
    ((profile.winRate?.win - winGame) /
      (profile.winRate?.win + profile.winRate?.lose - gameToday.length)) *
    100;

  const winRateToday = winRate - oldWinrate;

  const getColor = (
    type: "a" | "a+",
    winRate: number,
    opacity: number = 1,
    blue: number = 0
  ): string => {
    return `rgba(${
      255 * (1 - winRate) + (type === "a+" ? (winRate < 0.5 ? 25 : -25) : 0)
    },${
      255 * winRate + (type === "a+" ? (winRate > 0.5 ? 25 : -25) : 0)
    },${blue}, ${opacity})`;
  };

  return {
    profile,
    profileRecentMatches,
    heroes,
    maxDuration,
    showPreloader,
    playerHeroes,
    winRateToday,
    winRate,
    getColor,
  };
};

export { UseProfileData };
