import React from "react";
import MostHeroItem from "../../../../components/most-hero-item/most-hero-item.component";
import Preloader from "../../../../components/preloader/preloader.coponent";
import { playerHeroesType } from "../profile.hook";
import classes from "./heroes.module.scss";
const Heroes: React.FC<{ playerHeroes: playerHeroesType[] }> = ({
  playerHeroes,
}) => {
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
          <div>#</div>
          <div>Hero</div>
          <div>Matches</div>
          <div>Win</div>
          <div>Lose</div>
          <div>Win rate</div>
        </div>
        {playerHeroes?.map((el, i) => (
          <MostHeroItem el={el} key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Heroes);
