import React from "react";
import { useLocation } from "react-router-dom";
import classes from "./hero-desc.module.scss";
import { useHeroesData } from "../heroes.hook";
import Preloader from "../../../components/preloader/preloader.coponent";
const HeroDesc = () => {
  const { heroes, attr, baseUrl } = useHeroesData();
  const location = useLocation();
  let id = location.pathname.split("/")[2];
  const hero = heroes?.filter((el) => el.id + "" === id)[0];

  console.log(hero);
  if (!attr?.str || !heroes[0]?.localized_name || !hero?.localized_name) {
    return <Preloader />;
  }

  return (
    <div className={classes.heroDesk}>
      <img src={baseUrl + hero.img} className={classes.heroImg} alt="" />
      <div className={classes.description}>
        <div className={classes.name}>{hero.localized_name}</div>
        <div className={classes.roles}>
          {hero.roles.map((el, i) => (
            <span key={i}>
              {i !== 0 && ", "}
              {el}
            </span>
          ))}
        </div>
        <div
          className={classes.attributes}
          style={
            hero.primary_attr === attr.str.shortName
              ? { background: "#ff00002b" }
              : {}
          }
        >
          <img className={classes.attrImg} src={attr.str.img} alt="" />
          {hero.base_str}
          <span className={classes.gain}>&nbsp;+&nbsp;{hero.str_gain}</span>
        </div>
        <div
          className={classes.attributes}
          style={
            hero.primary_attr === attr.agi.shortName
              ? { background: "#00ff002b" }
              : {}
          }
        >
          <img className={classes.attrImg} src={attr.agi.img} alt="" />
          {hero.base_agi}
          <span className={classes.gain}>&nbsp;+&nbsp;{hero.agi_gain}</span>
        </div>
        <div
          className={classes.attributes}
          style={
            hero.primary_attr === attr.int.shortName
              ? { background: "#0000ff2b" }
              : {}
          }
        >
          <img className={classes.attrImg} src={attr.int.img} alt="" />
          {hero.base_int}
          <span className={classes.gain}>&nbsp;+&nbsp;{hero.int_gain}</span>
        </div>
      </div>

      <div className={classes.description}>
        <div className={classes.attributes}>
          Attack type: {hero.attack_type}
        </div>
        <div className={classes.attributes}>
          <img
            src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_attack_range.png"
            alt=""
            className={classes.attrImg}
          />
          <span>Attack range: {hero.attack_range}</span>
        </div>
        <div className={classes.attributes}>
          <img
            src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_movement_speed.png"
            alt=""
            className={classes.attrImg}
          />
          <span>Move speed: {hero.move_speed}</span>
        </div>
        <div className={classes.attributes}>
          <img
            src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_attack_time.png"
            alt=""
            className={classes.attrImg}
          />
          <span>Attack rate: {hero.attack_rate}</span>
        </div>
        <div className={classes.attributes}>
          <img
            src=" https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_projectile_speed.png"
            alt=""
            className={classes.attrImg}
          />
          <span>Projectile speed: {hero.projectile_speed}</span>
        </div>
      </div>
    </div>
  );
};

export default HeroDesc;
