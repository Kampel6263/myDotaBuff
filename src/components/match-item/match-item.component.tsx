import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../business-logic/redux/config";
import { HeroeProps } from "../../pages/heroes/heroes.component";
import { useHeroesData } from "../../pages/heroes/heroes.hook";
import classes from "./match-item.module.scss";

import * as dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  ProfileRecentMatches,
  UseProfileData,
} from "../../pages/search/pages/profile.hook";

declare module "dayjs" {
  interface Dayjs {
    fromNow: any;
    toNow: any;
    duration: any;
  }
}

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

type MatchItemProps = {
  matchDetails: ProfileRecentMatches;
  maxDuration: number;
};

const MatchItem: React.FC<MatchItemProps> = ({ matchDetails, maxDuration }) => {
  const { baseUrl } = useHeroesData();
  const { getColor } = UseProfileData();
  const navigate = useNavigate();
  const { heroes } = useSelector(
    (
      state: State
    ): {
      heroes: HeroeProps[];
    } => state.general
  );

  const hours = Math.floor(matchDetails.duration / 3600);
  const kdaSum =
    matchDetails.kills + matchDetails.deaths + matchDetails.assists;
  const kda =
    (matchDetails.kills + matchDetails.assists) /
    (matchDetails.deaths !== 0 ? matchDetails.deaths : 1);

  return (
    <div
      onClick={() => navigate(`/match/${matchDetails.match_id}`)}
      className={
        matchDetails.win
          ? classes.recentTatches
          : classNames(classes.recentTatches, classes.lost)
      }
    >
      <div className={classes.img}>
        <img
          src={
            baseUrl +
            heroes?.filter((img) => img.id === matchDetails.hero_id)[0]?.img
          }
          alt=""
        />
        <div className={classes.secondBlock}>
          <div
            className={
              matchDetails.win
                ? classNames(classes.heroName, classes.win)
                : classes.heroName
            }
          >
            {
              heroes.filter((itm) => itm.id === matchDetails.hero_id)[0]
                ?.localized_name
            }
          </div>
          <div>Normal skill</div>
        </div>
      </div>

      <div>
        <div
          className={
            matchDetails.win
              ? classes.matchStatus
              : classNames(classes.matchStatus, classes.lost)
          }
        >
          {matchDetails.win ? "Won " : "Lost "}Match
        </div>
        <div>
          {String(
            dayjs
              .unix(matchDetails.start_time + matchDetails.duration)
              .fromNow()
          )}
        </div>
      </div>
      {/* <div>
        <div>Ranked</div>
        <div>All Pick</div>
      </div> */}
      <div>
        {hours !== 0 && "0" + hours + ":"}
        {String(dayjs.unix(matchDetails.duration).format("mm:ss"))}
        <div
          style={{ width: `${(matchDetails.duration / maxDuration) * 100}%` }}
          className={classes.whiteLine}
        ></div>
      </div>

      <div className={classes.kda}>
        <span>{matchDetails.kills}</span>/<span>{matchDetails.deaths}</span>/
        <span>{matchDetails.assists}</span>
        <span
          className={classes.lstKda}
          style={{ color: getColor("a", kda / 8) }}
        >
          {" "}
          (KDA: {String(kda).slice(0, 4)})
        </span>
        <div className={classes.lines}>
          {" "}
          <div
            style={{
              width: `${(matchDetails.kills / kdaSum) * 100}%`,
            }}
          ></div>
          <div
            style={{
              width: `${(matchDetails.deaths / kdaSum) * 100}%`,
            }}
          ></div>
          <div
            style={{
              width: `${(matchDetails.assists / kdaSum) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default MatchItem;
