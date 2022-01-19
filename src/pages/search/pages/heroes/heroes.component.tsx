import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPlayerHeroes } from "../../../../business-logic/redux/store";
import MostHeroItem from "../../../../components/most-hero-item/most-hero-item.component";
import Preloader from "../../../../components/preloader/preloader.coponent";
import { UseHomeProfileData } from "../home-profile/home.hook";
import classes from "./heroes.module.scss";
const Heroes: React.FC<{ id: string }> = ({ id }) => {
  const { playerHeroes } = UseHomeProfileData();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlayerHeroes({ id: id, limit: 0 }));
  }, []);
  //   console.log(!!playerHeroes[0].games, "!!!");
  if (playerHeroes.length === 0 || !playerHeroes[0].games) {
    return <Preloader />;
  }
  return (
    <div className={classes.heroes}>
      <div className={classes.playerHeroes}>
        <div className={classes.title}>
          Most played heroes({playerHeroes.length})
        </div>
        <div className={classes.hero}>
          <div>Hero</div>
          <div>Matches</div>
          <div>Win</div>
          <div>Lose</div>
          <div>Win rate</div>
        </div>
        {playerHeroes?.map((el, i) => (
          <MostHeroItem el={el} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Heroes;
