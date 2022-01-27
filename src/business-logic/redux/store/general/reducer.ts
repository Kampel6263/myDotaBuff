import { reducer } from "redux-chill";
import { GeneralState } from "./state";
import { getheroes, search, getProfile, preloader } from "./actions";
import {
  getHistograms,
  getMatch,
  getPlayerHeroes,
  getProfileMatches,
  getWardMap,
} from ".";

/**
 * general state
 */
const general = reducer(new GeneralState())
  .on(getheroes.submit, (state: { heroes: object[] }, payload: object[]) => {
    // state.data = [];
    state.heroes = payload;
  })

  .on(search.submit, (state: { searchResult: object[] }, payload: object[]) => {
    state.searchResult = payload;
  })

  .on(getProfile.submit, (state: { profile: object }, payload: object) => {
    state.profile = payload;
  })
  .on(
    getProfileMatches.submit,
    (state: { profileRecentMatches: object[] }, payload: object[]) => {
      state.profileRecentMatches = payload;
    }
  )
  .on(getMatch.submit, (state: { matchDetails: object }, payload: object) => {
    state.matchDetails = payload;
  })

  .on(
    preloader.show,
    (state: { showPreloader: number | null }, payload: number) => {
      state.showPreloader = payload;
    }
  )
  .on(preloader.hide, (state: { showPreloader: number | null }) => {
    state.showPreloader = null;
  })

  .on(
    getPlayerHeroes.submit,
    (state: { playerHeroes: object[] }, payload: object[]) => {
      state.playerHeroes = payload;
    }
  )

  .on(getWardMap.submit, (state: { wardMapData: object }, payload: object) => {
    state.wardMapData = payload;
  })

  .on(
    getHistograms.submit,
    (state: { histograms: object[] }, payload: object[]) => {
      state.histograms = payload;
    }
  );
//   .on(addEl.sumbit, (state, payload) => {
//     state.data = payload;
//   })
//   .on(removeEl.submit, (state, payload) => {
//     state.data = payload;
//   })
//   .on(setPruductView.sumbit, (state, payload) => {
//     state.currentPruductView = payload;
//   })
//   .on(addComment.submit, (state, payload) => {
//     state.data = payload;
//   })
//   .on(editProduct.submit, (state, payload) => {
//     state.data = payload;
//   });

export { general };
