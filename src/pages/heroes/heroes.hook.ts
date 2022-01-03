import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../business-logic/redux/config";
import { HeroeProps } from "./heroes.component";

type HeroesImgProps = {
  id: number;
  src: string;
};

const useHeroesData = () => {
  const { heroes } = useSelector(
    (state: State): { heroes: HeroeProps[] } => state.general
  );
  const baseUrl =
    "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/";
  const heroesImg: HeroesImgProps[] = [];

  const pushImg = (id: number, name: string) => {
    heroesImg.push({
      id: id,
      src: baseUrl + name + ".png",
    });
  };

  if (heroes) {
    for (let el of heroes) {
      switch (el.localized_name) {
        case "Wraith King":
          pushImg(el.id, "skeleton_king");
          break;

        case "Clockwerk":
          // setHeroesImg('rattletrap')
          pushImg(el.id, "rattletrap");
          break;
        case "Lifestealer":
          pushImg(el.id, "life_stealer");
          break;
        case "Doom":
          pushImg(el.id, "doom_bringer");
          break;
        case "Treant Protector":
          pushImg(el.id, "treant");
          break;
        case "Io":
          pushImg(el.id, "wisp");
          break;
        case "Centaur Warrunner":
          pushImg(el.id, "centaur");
          break;
        case "Magnus":
          pushImg(el.id, "magnataur");
          break;
        case "Timbersaw":
          pushImg(el.id, "shredder");
          break;
        case "Underlord":
          pushImg(el.id, "abyssal_underlord");
          break;
        case "Io":
          pushImg(el.id, "wisp");
          break;
        default:
          pushImg(
            el.id,
            el.localized_name.toLowerCase().replace("-", "").replace(" ", "_")
          );
      }
    }
  }

  return { heroes, heroesImg };
};

export { useHeroesData };
