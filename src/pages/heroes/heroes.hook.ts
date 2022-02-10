import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../business-logic/redux/config";
import { HeroeProps } from "./heroes.component";

const useHeroesData = () => {
  const { heroes, showPreloader } = useSelector(
    (state: State): { heroes: HeroeProps[]; showPreloader: number | null } =>
      state.general
  );
  const baseUrl = "https://cdn.cloudflare.steamstatic.com";

  const attr = {
    int: {
      name: "Intelligence",
      shortName: "int",
      img: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png",
    },
    str: {
      name: "Strength",
      shortName: "str",
      img: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png",
    },
    agi: {
      name: "Agility",
      shortName: "agi",
      img: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png",
    },
  };

  return { heroes, showPreloader, attr, baseUrl };
};

export { useHeroesData };
