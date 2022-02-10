import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroeProps } from "../../pages/heroes/heroes.component";
import { useHeroesData } from "../../pages/heroes/heroes.hook";
import classes from "./hero-attr.module.scss";

type HeroAttrProps = {
  data: HeroeProps;
  type: "int" | "str" | "agi";
};

const HeroAttr: React.FC<HeroAttrProps> = ({ data, type }) => {
  const { baseUrl, attr } = useHeroesData();
  const navigate = useNavigate();

  if (data.primary_attr === type) {
    return (
      <div
        className={classes.hero}
        onClick={() => navigate(`/heroes/${data.id}`)}
      >
        <img
          className={classes.heroImg}
          src={
            data.img
              ? baseUrl + data.img
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
