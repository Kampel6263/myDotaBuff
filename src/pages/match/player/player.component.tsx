import React, { useEffect } from "react";
import { getMatchData } from "../match.hook";
import classes from "./player.module.scss";
import { PlayerType } from "../match.hook";
import { useHeroesData } from "../../heroes/heroes.hook";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useItemsData } from "../../items/items.hook";
import Item from "../../../components/item/item.component";
import { UseProfileData } from "../../search/pages/profile.hook";
import { useDispatch } from "react-redux";
import { getItems } from "../../../business-logic/redux/store";

type PlayerProps = {
  el?: PlayerType;
  columsName?: string[];
  index?: number;
};

const Player: React.FC<PlayerProps> = ({ el, columsName, index }) => {
  const { heroes, baseUrl } = useHeroesData();
  const { itemsArray } = UseProfileData();
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

  // console.log(el, "player el");

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
      <div className={classes.items}>
        <div className={classes.main}>
          {itemsArray
            .filter(
              (itm) =>
                itm.id === el.item_0 ||
                itm.id === el.item_1 ||
                itm.id === el.item_2 ||
                itm.id === el.item_3 ||
                itm.id === el.item_4 ||
                itm.id === el.item_5
            )
            .map((itm, i) => (
              <Item key={i} el={itm} position={"leftBottom"} />
            ))}
        </div>
        <div className={classes.neitral}>
          {itemsArray.filter((itm) => itm.id === el.item_neutral)[0] && (
            <Item
              el={itemsArray.filter((itm) => itm.id === el.item_neutral)[0]}
              position={"leftBottom"}
              neitral={true}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>No item</div>
  );
};

export default Player;
