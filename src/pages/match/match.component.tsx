import classNames from "classnames";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { State } from "../../business-logic/redux/config";
import { getMatch } from "../../business-logic/redux/store/general";
import Preloader from "../../components/preloader/preloader.coponent";
import Title from "../../components/title/title.component";
import { PreloaderEnum } from "../../types/preloader";
import { useHeroesData } from "../heroes/heroes.hook";
import { matchDetail } from "./match.hook";
import classes from "./match.module.scss";
import Player from "./player/player.component";

const Match = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const dispatch = useDispatch();

  const { matchDetails, showPreloader } = useSelector(
    (
      state: State
    ): { matchDetails: matchDetail; showPreloader: number | null } =>
      state.general
  );

  const dataF = [
    "Hero",
    "Player",
    "K",
    "D",
    "A",
    "NET",
    "LH/DN",
    "GPM/XPM",
    "DMG",
    "HEAL",
    "BLD",
  ];
  useEffect(() => {
    if (id) {
      dispatch(getMatch(id));
    }
  }, []);

  if (showPreloader === PreloaderEnum.MatchDetail) {
    return <Preloader />;
  }

  return (
    <div>
      <div
        className={
          matchDetails.radiant_win
            ? classes.title
            : classNames(classes.title, classes.direWin)
        }
      >
        {matchDetails.radiant_win ? "RADIANT VICTORY" : "DIRE VICTORY"}
      </div>
      <div className={classes.score}>
        <div className={classes.radiantScore}>{matchDetails.radiant_score}</div>
        <div>{String(dayjs.unix(matchDetails.duration).format("mm:ss"))}</div>
        <div className={classes.direScore}> {matchDetails.dire_score}</div>
      </div>

      <Title className={classes.playerInfoTitle}>The radiant</Title>
      <div className={classes.playersInfo}>
        <Player columsName={dataF} />
        {matchDetails.players
          ?.filter((el) => el.isRadiant)
          .map((el, i) => (
            <Player el={el} index={i} key={i} />
          ))}
      </div>
      <Title className={classes.playerInfoTitle}>The dire</Title>
      <div className={classes.playersInfo}>
        <Player columsName={dataF} />
        {matchDetails.players
          ?.filter((el) => !el.isRadiant)
          .map((el, i) => (
            <Player el={el} key={i} index={i} />
          ))}
      </div>
    </div>
  );
};

export default Match;
