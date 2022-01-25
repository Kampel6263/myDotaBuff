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
import Title from "../../../../components/title/title.component";
import ActivitiCalendar from "../../../../components/activiti-calendar/activiti-calendar.component";
import dayjs from "dayjs";
import { date } from "yup";
import { transform } from "typescript";

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

  useEffect(() => {
    if (id) {
      dispatch(getProfileMatches({ id: Number(id), count: 100 }));

      dispatch(getProfile(Number(id)));
      dispatch(getPlayerHeroes({ id: id, limit: 10 }));
    }
  }, [id]);

  if (showPreloader === PreloaderEnum.Profile || !profile?.profile) {
    return <Preloader />;
  }

  const gameToday = profileRecentMatches.filter(
    (el) =>
      dayjs.unix(el.start_time).format("DD/MM/YY") ===
      dayjs.unix(Date.now() / 1000).format("DD/MM/YY")
  );

  const winGame = gameToday?.filter((el) => el.win).length;
  const rangImg = profile?.profile?.rank_tier
    ? "r" + String(profile?.profile?.rank_tier).split("")[0]
    : false;

  const arrWithStars: { img: string; mt: number }[] = [];
  const starCount = Number(String(profile.profile.rank_tier).split("")[1]);
  for (let i = 0; i < starCount; i++) {
    arrWithStars.push({
      img: "star",
      mt:
        starCount % 2 !== 0 ? Math.sqrt(Math.floor(starCount / 2 - i) ** 2) : 0,
    });
  }

  const winRate =
    (profile.winRate?.win / (profile.winRate?.win + profile.winRate?.lose)) *
    100;

  const oldWinrate =
    ((profile.winRate?.win - winGame) /
      (profile.winRate?.win + profile.winRate?.lose - gameToday.length)) *
    100;

  const winRateToday = winRate - oldWinrate;

  return (
    <div>
      {profile?.profile?.profile?.account_id ? (
        <div>
          <div className={classes.header}>
            <img src={profile?.profile.profile?.avatarfull} alt="" />
            <div className={classes.idBlock}>
              <span>ID:</span> {profile.profile.profile.account_id}{" "}
              <div className={classes.rang}>
                <div className={classes.stars}>
                  {arrWithStars.map((el, i) => (
                    <img
                      key={i}
                      style={{
                        marginTop: `${el.mt}px`,
                        transform: `scale(${1.1 - el.mt / 10})`,
                      }}
                      className={classes.star}
                      src={require(`/src/assets/img/${el.img}.png`)}
                    />
                  ))}
                </div>
                <img
                  className={classes.rangImg}
                  src={require(`/src/assets/img/${rangImg}.png`)}
                />
              </div>
            </div>
            <div>
              <span>Nick name:</span> {profile?.profile.profile?.personaname}{" "}
            </div>
            <div>
              <span>MMR:</span> {profile?.profile.mmr_estimate?.estimate}{" "}
            </div>
            <div>
              <span>Matches:</span> {profile.winRate.win + profile.winRate.lose}
            </div>
            <div>
              <span>Win:</span> {profile?.winRate.win}
            </div>
            <div>
              <span>Lose:</span> {profile?.winRate.lose}
            </div>

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
              <span>Win rate:</span> {String(winRate).slice(0, 5)}%
              {winRateToday !== 0 && (
                <span
                  className={classes.winRateToday}
                  style={{
                    color: `${winRateToday > 0 ? "rgb(0,255,0)" : "red"}`,
                  }}
                >
                  {winRateToday > 0 ? "+" : ""}
                  {String(winRateToday).slice(0, 5)}% today
                </span>
              )}
            </div>
            <div className={classes.calendar}>
              <ActivitiCalendar />
            </div>
          </div>
          <Title className={classes.title}>Most played heroes</Title>

          <div className={classes.playerHeroes}>
            <div className={classes.hero}>
              <div>Hero</div>
              <div>Matches</div>
              <div>Win</div>
              <div>Lose</div>
              <div>Win rate</div>
            </div>
            {playerHeroes.slice(0, 7).map((el, i) => (
              <MostHeroItem el={el} key={i} />
            ))}
          </div>
          <div
            className={classes.showMore}
            onClick={() => navigate(`/profile/${id}/heroes`)}
          >
            Show more
          </div>
          <Title className={classes.title}>Recent matches</Title>
          <div className={classes.matches}>
            {profileRecentMatches ? (
              profileRecentMatches
                .slice(0, 7)
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
