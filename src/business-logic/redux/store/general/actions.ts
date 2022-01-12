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

const getProfileRecentMatches = make("[general] get recent matches")
  .stage((payload: number) => payload)
  .stage("submit", (payload: object[]) => payload);

const getMatch = make("[general get match details]")
  .stage((payload: string) => payload)
  .stage("submit", (payload: object) => payload);

const preloader = make("[general] show preloader")
  .stage("show", (payload: number) => payload)
  .stage("hide");

export {
  getheroes,
  search,
  getProfile,
  getProfileRecentMatches,
  getMatch,
  preloader,
};
