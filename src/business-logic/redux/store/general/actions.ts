import { make } from "redux-chill";

const getheroes = make("[general] get all heroes").stage(
  "submit",
  (payload): object[] => payload
);

const search = make("[general] get people")
  .stage((payload: string) => payload)
  .stage("submit", (payload: object[]) => payload);

const getProfile = make("[general] get profile")
  .stage((payload: number) => payload)
  .stage("submit", (payload: object) => payload);

const getProfileMatches = make("[general] get recent matches")
  .stage((payload: { id: number; count: number }) => payload)
  .stage("submit", (payload: object[]) => payload);

const getMatch = make("[general get match details]")
  .stage((payload: string) => payload)
  .stage("submit", (payload: object) => payload);

const preloader = make("[general] show preloader")
  .stage("show", (payload: number) => payload)
  .stage("hide");

const getPlayerHeroes = make("[general] get player heroes")
  .stage((payload: { id: string; limit: number }) => payload)
  .stage("submit", (payload: object[]) => payload);

const getWardMap = make("[general] get ward map data")
  .stage((payload: string) => payload)
  .stage("submit", (payload: any) => payload);

export {
  getheroes,
  search,
  getProfile,
  getProfileMatches,
  getMatch,
  preloader,
  getPlayerHeroes,
  getWardMap,
};
