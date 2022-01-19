import React from "react";
import { useHeroesData } from "../../pages/heroes/heroes.hook";
import { playerHeroesType } from "../../pages/search/pages/home-profile/home.hook";
import classes from "./most-hero-item.module.scss";

const MostHeroItem: React.FC<{ el: playerHeroesType }> = ({ el }) => {
  const { heroesImg } = useHeroesData();

  return (
    <div className={classes.hero}>
      <img
        src={
          heroesImg?.filter((hero) => String(hero.id) === el.hero_id)[0]?.src
        }
        alt=""
      />
      <div>{el.games}</div>
      <div>{el.win}</div>
      <div>{el.games - el.win}</div>
      <div
        style={{
          color: `rgb(${
            255 -
            (el.win / el.games) * 255 +
            (el.win / el.games < 0.5 ? 25 : -25)
          },${
            (el.win / el.games) * 255 + (el.win / el.games > 0.5 ? 25 : -25)
          },0)`,
        }}
      >
        {el.games ? String((el.win / el.games) * 100).slice(0, 5) + "%" : 0}
      </div>
    </div>
  );
};

export default MostHeroItem;
