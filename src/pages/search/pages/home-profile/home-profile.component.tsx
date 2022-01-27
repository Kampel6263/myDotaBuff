import classNames from "classnames";
import React, { Children, useEffect, useState } from "react";
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

  const secondData: any = {
    "74": { "92": 1, "94": 1, "100": 1, "116": 1, "120": 1 },
    "76": { "100": 1, "102": 1, "154": 1 },
    "78": { "118": 1 },
    "80": { "154": 1, "156": 2, "176": 1 },
    "82": { "134": 1, "154": 11, "156": 2, "170": 1, "176": 1 },
    "84": {
      "94": 1,
      "96": 1,
      "100": 2,
      "116": 3,
      "144": 2,
      "146": 3,
      "154": 2,
      "156": 2,
      "158": 1,
      "162": 1,
      "170": 1,
    },
    "86": {
      "102": 1,
      "104": 1,
      "114": 1,
      "116": 4,
      "142": 1,
      "144": 15,
      "146": 21,
      "152": 2,
      "156": 3,
      "158": 11,
      "162": 6,
      "164": 3,
    },
    "88": {
      "76": 1,
      "86": 1,
      "96": 1,
      "104": 1,
      "128": 2,
      "142": 4,
      "144": 4,
      "152": 1,
      "158": 1,
    },
    "90": { "76": 1, "94": 1, "128": 1, "130": 1, "164": 1 },
    "92": {
      "84": 1,
      "94": 1,
      "96": 1,
      "118": 4,
      "120": 8,
      "130": 2,
      "132": 2,
      "142": 1,
      "164": 1,
      "166": 3,
    },
    "94": {
      "118": 15,
      "120": 9,
      "124": 1,
      "126": 1,
      "132": 1,
      "140": 1,
      "142": 1,
      "160": 2,
      "164": 1,
      "166": 1,
    },
    "96": {
      "84": 1,
      "86": 1,
      "88": 4,
      "90": 1,
      "92": 1,
      "100": 1,
      "128": 2,
      "130": 2,
      "134": 1,
      "140": 3,
      "154": 1,
      "160": 1,
      "162": 1,
    },
    "98": {
      "128": 1,
      "130": 1,
      "132": 1,
      "152": 2,
      "154": 6,
      "156": 2,
      "160": 3,
      "162": 2,
      "172": 2,
    },
    "100": {
      "72": 2,
      "78": 1,
      "106": 1,
      "118": 1,
      "126": 3,
      "130": 2,
      "132": 39,
      "134": 3,
      "152": 1,
      "154": 11,
      "156": 4,
      "158": 5,
      "160": 5,
      "162": 3,
      "164": 3,
      "168": 2,
      "172": 2,
      "174": 2,
    },
    "102": {
      "90": 1,
      "106": 1,
      "108": 1,
      "116": 2,
      "132": 17,
      "154": 4,
      "156": 1,
      "178": 1,
    },
    "104": {
      "74": 1,
      "98": 1,
      "100": 3,
      "108": 1,
      "132": 6,
      "154": 1,
      "160": 1,
    },
    "106": {
      "78": 1,
      "80": 1,
      "112": 1,
      "132": 3,
      "154": 1,
      "156": 1,
      "184": 1,
    },
    "108": { "84": 1, "110": 1, "152": 2, "156": 4 },
    "110": { "78": 1, "112": 1, "128": 1, "152": 6, "156": 3, "158": 1 },
    "112": { "88": 4, "90": 5, "102": 1, "138": 1, "156": 2 },
    "114": {
      "88": 5,
      "90": 6,
      "128": 12,
      "130": 5,
      "154": 3,
      "156": 5,
      "158": 2,
    },
    "116": {
      "124": 4,
      "126": 10,
      "128": 4,
      "130": 3,
      "152": 4,
      "156": 1,
      "158": 1,
      "166": 1,
    },
    "118": {
      "86": 1,
      "92": 4,
      "124": 2,
      "126": 1,
      "148": 1,
      "150": 1,
      "152": 5,
      "156": 1,
      "166": 3,
    },
    "120": {
      "72": 1,
      "84": 4,
      "86": 1,
      "90": 2,
      "92": 3,
      "120": 1,
      "122": 3,
      "134": 1,
      "136": 3,
      "142": 2,
      "152": 2,
      "154": 2,
      "156": 1,
      "158": 1,
      "160": 1,
    },
    "122": {
      "84": 2,
      "96": 4,
      "114": 1,
      "118": 2,
      "130": 4,
      "132": 10,
      "134": 16,
      "138": 1,
      "150": 1,
    },
    "124": {
      "90": 1,
      "94": 1,
      "96": 1,
      "118": 12,
      "120": 12,
      "128": 3,
      "130": 4,
      "132": 2,
      "140": 1,
      "142": 16,
      "144": 7,
      "160": 2,
    },
    "126": {
      "94": 2,
      "96": 2,
      "116": 1,
      "118": 15,
      "120": 3,
      "126": 3,
      "142": 26,
      "144": 22,
      "160": 1,
      "162": 1,
    },
    "128": {
      "86": 1,
      "90": 1,
      "92": 2,
      "96": 1,
      "116": 7,
      "118": 8,
      "124": 6,
      "126": 5,
      "128": 1,
      "142": 1,
      "150": 1,
      "160": 1,
    },
    "130": {
      "86": 4,
      "88": 1,
      "96": 1,
      "100": 2,
      "102": 7,
      "104": 1,
      "124": 6,
      "126": 1,
      "144": 1,
      "150": 2,
      "152": 1,
    },
    "132": {
      "102": 1,
      "108": 7,
      "110": 7,
      "114": 2,
      "124": 14,
      "148": 6,
      "156": 2,
      "158": 2,
    },
    "134": {
      "86": 1,
      "94": 8,
      "96": 9,
      "104": 3,
      "108": 14,
      "110": 17,
      "122": 1,
      "124": 12,
      "146": 1,
      "164": 3,
      "166": 10,
    },
    "136": { "88": 1, "94": 9, "96": 5, "124": 1, "164": 5, "166": 6 },
    "138": { "94": 1, "96": 1, "120": 1, "156": 1, "160": 2 },
    "140": { "94": 1, "96": 1, "104": 2, "106": 1, "138": 1 },
    "142": {
      "90": 3,
      "92": 1,
      "98": 2,
      "100": 4,
      "102": 6,
      "120": 14,
      "122": 17,
      "138": 1,
      "156": 1,
    },
    "144": {
      "96": 1,
      "98": 2,
      "100": 3,
      "102": 3,
      "104": 1,
      "120": 23,
      "122": 16,
      "158": 1,
    },
    "146": { "98": 4, "104": 1, "116": 1, "146": 1, "172": 1, "176": 1 },
    "148": { "98": 1, "100": 1, "102": 4, "104": 1, "114": 4, "116": 4 },
    "150": {
      "98": 1,
      "100": 2,
      "102": 1,
      "114": 7,
      "116": 1,
      "120": 1,
      "126": 2,
      "128": 4,
      "144": 1,
      "146": 1,
      "172": 1,
    },
    "152": {
      "116": 4,
      "122": 1,
      "124": 1,
      "128": 1,
      "138": 1,
      "144": 1,
      "146": 2,
      "160": 1,
      "162": 1,
      "164": 1,
      "172": 1,
      "174": 2,
    },
    "154": {
      "80": 1,
      "82": 2,
      "88": 1,
      "114": 1,
      "116": 3,
      "122": 1,
      "126": 1,
      "128": 3,
      "130": 1,
      "148": 1,
      "150": 1,
      "160": 5,
      "162": 4,
    },
    "156": {
      "82": 2,
      "92": 2,
      "94": 1,
      "98": 2,
      "100": 4,
      "110": 11,
      "124": 1,
      "130": 1,
      "134": 5,
      "136": 1,
    },
    "158": {
      "94": 3,
      "96": 5,
      "98": 11,
      "100": 20,
      "102": 1,
      "110": 1,
      "118": 4,
      "120": 2,
      "136": 14,
      "154": 3,
      "160": 2,
      "166": 2,
    },
    "160": {
      "94": 1,
      "120": 7,
      "136": 1,
      "138": 1,
      "148": 1,
      "154": 2,
      "158": 1,
    },
    "162": {
      "86": 2,
      "120": 1,
      "132": 1,
      "134": 2,
      "152": 1,
      "154": 1,
      "158": 2,
    },
    "164": { "86": 1, "108": 1, "110": 9, "132": 1, "134": 1 },
    "166": {
      "88": 1,
      "98": 2,
      "100": 1,
      "108": 2,
      "110": 17,
      "120": 1,
      "122": 2,
      "132": 6,
      "134": 11,
      "148": 1,
      "150": 5,
      "152": 1,
      "160": 1,
    },
    "168": {
      "88": 2,
      "90": 5,
      "92": 2,
      "94": 2,
      "96": 1,
      "98": 24,
      "100": 3,
      "104": 1,
      "120": 2,
      "122": 1,
      "132": 1,
      "134": 3,
      "148": 1,
      "152": 2,
      "154": 1,
      "164": 1,
      "176": 1,
    },
    "170": { "94": 1, "152": 1, "154": 1 },
    "172": { "102": 6, "164": 1 },
    "174": { "166": 3 },
    "176": { "96": 1, "140": 1, "148": 1, "160": 1, "172": 1, "174": 1 },
    "178": { "92": 1, "98": 1, "102": 1, "162": 1 },
    "180": { "156": 1 },
    "182": { "136": 1, "146": 1, "148": 1 },
    "184": { "146": 1 },
  };

  useEffect(() => {
    if (id) {
      dispatch(getProfileMatches({ id: Number(id), count: 100 }));

      dispatch(getProfile(Number(id)));
      dispatch(getPlayerHeroes({ id: id, limit: 10 }));
    }
  }, [id]);

  if (
    showPreloader === PreloaderEnum.Profile ||
    !profile?.profile ||
    !profileRecentMatches[0]?.match_id
  ) {
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
            <div>
              <span>ID:</span> {profile.profile.profile.account_id}{" "}
            </div>
            <div className={classes.name}>
              <span>Nick name:</span> {profile?.profile.profile?.personaname}{" "}
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
