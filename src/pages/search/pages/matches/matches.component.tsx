import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfileMatches } from "../../../../business-logic/redux/store";
import MatchItem from "../../../../components/match-item/match-item.component";
import Preloader from "../../../../components/preloader/preloader.coponent";
import { PreloaderEnum } from "../../../../types/preloader";
import { UseHomeProfileData } from "../home-profile/home.hook";
import classes from "./matches.module.scss";
const Matches: React.FC<{ id: string }> = ({ id }) => {
  const { profileRecentMatches, maxDuration, showPreloader } =
    UseHomeProfileData();

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      //   dispatch(getProfile(Number(id)));
      dispatch(getProfileMatches({ id: Number(id), count: 100 }));
      //   dispatch(getPlayerHeroes({ id: id, limit: 10 }));
    }
  }, [id]);
  if (showPreloader === PreloaderEnum.Profile) {
    return <Preloader />;
  }
  return (
    <div className={classes.matches}>
      Matches({profileRecentMatches.length})
      {profileRecentMatches ? (
        profileRecentMatches.map((el, i) => (
          <MatchItem matchDetails={el} maxDuration={maxDuration} key={i} />
        ))
      ) : (
        <div>Recent matches was not found</div>
      )}
    </div>
  );
};

export default Matches;
