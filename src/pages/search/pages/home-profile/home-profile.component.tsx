import classNames from "classnames";
import React from "react";
import classes from "./home-profile.module.scss";
import MatchItem from "../../../../components/match-item/match-item.component";
import Preloader from "../../../../components/preloader/preloader.coponent";
import { PreloaderEnum } from "../../../../types/preloader";
import { useNavigate } from "react-router-dom";
import MostHeroItem from "../../../../components/most-hero-item/most-hero-item.component";
import Title from "../../../../components/title/title.component";
import {
  playerHeroesType,
  ProfileRecentMatches,
  ProfileType,
  UseProfileData,
} from "../profile.hook";

type HomeProfileProps = {
  id: string;
  profileRecentMatches: ProfileRecentMatches[];
  profile: ProfileType;
  playerHeroes: playerHeroesType[];
};

const HomeProfile: React.FC<HomeProfileProps> = ({
  id,
  profileRecentMatches,
  profile,
  playerHeroes,
}) => {
  const navigate = useNavigate();
  const { maxDuration, showPreloader } = UseProfileData();

  if (
    showPreloader === PreloaderEnum.Profile ||
    !profile?.profile ||
    !profileRecentMatches[0]?.match_id
  ) {
    return <Preloader />;
  }

  return (
    <div>
      {profile?.profile?.profile?.account_id ? (
        <div>
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

export default React.memo(HomeProfile);
