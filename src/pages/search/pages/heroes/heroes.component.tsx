import React from "react";
import MostHeroItem from "../../../../components/most-hero-item/most-hero-item.component";
import { UseHomeProfileData } from "../home-profile/home.hook";
import classes from "./heroes.module.scss";
const Heroes = () => {
  const { playerHeroes } = UseHomeProfileData();

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
        {playerHeroes.map((el, i) => (
          <MostHeroItem el={el} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Heroes;
