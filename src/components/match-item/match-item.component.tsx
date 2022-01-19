import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../business-logic/redux/config";
import { HeroeProps } from "../../pages/heroes/heroes.component";
import { useHeroesData } from "../../pages/heroes/heroes.hook";
import { ProfileRecentMatches } from "../../pages/search/pages/home-profile/home-profile.component";
import classes from "./match-item.module.scss";

import * as dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

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
  const { heroesImg } = useHeroesData();
  const navigate = useNavigate();
  const { heroes } = useSelector(
    (
      state: State
    ): {
      heroes: HeroeProps[];
    } => state.general
  );

  const hours = Math.floor(matchDetails.duration / 3600);

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
            heroesImg?.filter((img) => img.id === matchDetails.hero_id)[0]?.src
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
      <div>
        <div>Ranked</div>
        <div>All Pick</div>
      </div>
      <div>
        {hours !== 0 && "0" + hours + ":"}
        {String(dayjs.unix(matchDetails.duration).format("mm:ss"))}
        <div
          style={{ width: `${(matchDetails.duration / maxDuration) * 100}%` }}
          className={classes.whitmatchDetailsine}
        ></div>
      </div>

      <div>
        {matchDetails.kills}/{matchDetails.deaths}/{matchDetails.assists}
      </div>
    </div>
  );
};
export default MatchItem;
