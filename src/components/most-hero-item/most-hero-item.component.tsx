import React from "react";
import { useHeroesData } from "../../pages/heroes/heroes.hook";
import {
  playerHeroesType,
  UseProfileData,
} from "../../pages/search/pages/profile.hook";

import classes from "./most-hero-item.module.scss";

const MostHeroItem: React.FC<{ el: playerHeroesType; index: number }> = ({
  el,
  index,
}) => {
  const { baseUrl, heroes } = useHeroesData();
  const { getColor } = UseProfileData();
  const winRate = el.win / el.games;
  return (
    <div className={classes.hero}>
      <div>{index + 1}</div>
      <img
        src={
          baseUrl +
          heroes?.filter((hero) => String(hero.id) === el.hero_id)[0]?.img
        }
        alt=""
      />
      <div>{el.games}</div>
      <div>{el.win}</div>
      <div>{el.games - el.win}</div>
      <div
        style={{
          color: getColor("a+", winRate),
        }}
      >
        {el.games ? String(winRate * 100).slice(0, 5) + "%" : 0}
      </div>
    </div>
  );
};

export default MostHeroItem;
