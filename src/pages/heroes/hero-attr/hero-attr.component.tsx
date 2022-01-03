import React, { useEffect, useState } from "react";
import { HeroeProps } from "../heroes.component";
import { useHeroesData } from "../heroes.hook";
import classes from "./hero-attr.module.scss";

type HeroAttrProps = {
  data: HeroeProps;
  type: "int" | "str" | "agi";
};

const HeroAttr: React.FC<HeroAttrProps> = ({ data, type }) => {
  const { heroesImg } = useHeroesData();

  let currentImg = heroesImg?.filter((el) => el.id === data.id)[0];

  const attr = {
    int: {
      name: "Intelligence",
      img: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png",
    },
    str: {
      name: "Strength",
      img: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png",
    },
    agi: {
      name: "Agility",
      img: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png",
    },
  };

  // console.log(`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${data.localized_name.toLowerCase().replace('-','').replace(' ', '_')}.png`)

  if (data.primary_attr === type) {
    return (
      <div className={classes.hero}>
        <img
          className={classes.heroImg}
          src={
            currentImg
              ? currentImg.src
              : `https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg`
          }
          alt=""
        />
        <div className={classes.text}>
          <div className={classes.attr}>
            <img src={attr[data.primary_attr].img} alt="" />
            <div>{data.localized_name}</div>
          </div>
        </div>
      </div>
    );
  }
  return <React.Fragment></React.Fragment>;
};

export default HeroAttr;
