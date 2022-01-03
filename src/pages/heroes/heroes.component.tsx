import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../business-logic/redux/config";
import { getheroes } from "../../business-logic/redux/store";
import HeroAttr from "./hero-attr/hero-attr.component";
import { useHeroesData } from "./heroes.hook";
import classes from "./heroes.module.scss";

export type HeroeProps = {
  attack_type: string;
  id: number;
  legs: number;
  localized_name: string;
  name: string;
  primary_attr: "int" | "str" | "agi";
  roles: string[];
};

const Heroes: React.FC = () => {
  // const [heroes, setHeroes] = useState<HeroeProps[]>([])
  const { heroes } = useHeroesData();

  // console.log(heroes, "heroes");

  return (
    <div className={classes.heroesPage}>
      <h2>Strength</h2>
      <div className={classes.heroes}>
        {heroes.map((el, i) => (
          <HeroAttr type="str" key={i} data={el} />
        ))}
      </div>
      <h2>Agility</h2>
      <div className={classes.heroes}>
        {heroes.map((el, i) => (
          <HeroAttr type="agi" key={i} data={el} />
        ))}
      </div>
      <h2>Intelligence</h2>
      <div className={classes.heroes}>
        {heroes.map((el, i) => (
          <HeroAttr type="int" key={i} data={el} />
        ))}
      </div>
    </div>
  );
};

export default Heroes;
