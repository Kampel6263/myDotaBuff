import React from "react";
import { getMatchData } from "../match.hook";
import classes from "./player.module.scss";
import { PlayerType } from "../match.hook";
import { useHeroesData } from "../../heroes/heroes.hook";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

type PlayerProps = {
  el?: PlayerType;
  columsName?: string[];
  index?: number;
};

const Player: React.FC<PlayerProps> = ({ el, columsName, index }) => {
  const { heroes, baseUrl } = useHeroesData();
  const navigate = useNavigate();
  if (columsName) {
    return (
      <div className={classes.player}>
        {columsName.map((itm, i) => (
          <div key={i}>{itm}</div>
        ))}
      </div>
    );
  }
  return el && (index || index === 0) ? (
    <div
      className={
        index % 2 !== 0
          ? classes.player
          : classNames(classes.player, classes.grey)
      }
    >
      <div className={classes.heroImg}>
        <img
          src={
            baseUrl + heroes.filter((hero) => hero.id === el.hero_id)[0]?.img
          }
          alt={
            heroes.filter((hero) => hero.id === el.hero_id)[0]?.localized_name
          }
        />
        <div>{el.level}</div>
      </div>
      <div
        onClick={() => {
          if (el.account_id) {
            navigate(`/profile/${el.account_id}`);
          }
        }}
        className={el.account_id ? classes.activeId : ""}
      >
        {el.personaname
          ? el.personaname.length > 8
            ? el.personaname.slice(0, 7) + "..."
            : el.personaname
          : "Anonymous"}
      </div>
      <div>{el.kills}</div>
      <div>{el.deaths}</div>
      <div>{el.assists}</div>
      <div className={classes.netWorth}>{Math.round(el.net_worth / 1000)}k</div>
      <div>
        {el.last_hits}/{el.denies}
      </div>
      <div>
        {el.gold_per_min}/{el.xp_per_min}
      </div>
      <div>{Math.round(el.hero_damage / 1000)}k</div>
      <div>{el.hero_healing ? el.hero_healing : "-"}</div>
      <div>{Math.round(el.tower_damage / 1000)}k</div>
    </div>
  ) : (
    <div>No item</div>
  );
};

export default Player;
