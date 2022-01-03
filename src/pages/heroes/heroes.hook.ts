import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../business-logic/redux/config";
import { HeroeProps } from "./heroes.component";

const useHeroesData = () => {
  const { heroes } = useSelector(
    (state: State): { heroes: HeroeProps[] } => state.general
  );
  const baseUrl =
    "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/";
  const heroesImg = [];

  if (heroes) {
    for (let el of heroes) {
      switch (el.localized_name) {
        case "Wraith King":
          // setHeroesImg('skeleton_king')
          heroesImg.push({
            id: el.id,
            src: baseUrl + "skeleton_king.png",
          });
          break;

        // case "Clockwerk":
        //   // setHeroesImg('rattletrap')
        //   break;
        // case "Lifestealer":
        //   // setHeroesImg('life_stealer')
        //   break;
        // case "Doom":
        //   // setHeroesImg('doom_bringer')
        //   break;
        // case 'Clockwerk':
        // setHeroesImg('rattletrap')
        // break
        // case 'Clockwerk':
        // setHeroesImg('rattletrap')
        // break
        default:
          heroesImg.push({
            id: el.id,
            src:
              baseUrl +
              el.localized_name
                .toLowerCase()
                .replace("-", "")
                .replace(" ", "_") +
              ".png",
          });
      }
    }
    console.log(heroesImg, "ddd");
  }

  return { heroes, heroesImg };
};

export { useHeroesData };
