import { Payload, Saga } from "redux-chill";
import { put, call } from "redux-saga/effects";
import {
  getHistograms,
  getMatch,
  getPlayerHeroes,
  getWardMap,
  preloader,
} from ".";
import { PreloaderEnum } from "../../../../types/preloader";

import { SagasContext } from "../../config/sagas-context";
import { getheroes, getProfile, search, getProfileMatches } from "./actions";
/**
 * general saga
 */
class GeneralSaga {
  /**
   * App init
   */
  @Saga(getheroes)
  public *getheroes(payload: Payload<typeof getheroes>, { api }: SagasContext) {
    try {
      yield put(preloader.show(PreloaderEnum.GetHeroes));
      const response: object[] = yield call(api.general.getHeroes);
      yield put(getheroes.submit(response));
      // yield put(getAllEl.submit(response));
    } catch (error) {
    } finally {
      yield put(preloader.hide());
    }
  }
  @Saga(search)
  public *search(payload: Payload<typeof search>, { api }: SagasContext) {
    try {
      yield put(preloader.show(PreloaderEnum.SearchResult));
      const response: object[] = yield call(api.general.search, payload);
      yield put(search.submit(response));
    } catch (error) {
    } finally {
      yield put(preloader.hide());
    }
  }

  @Saga(getProfile)
  public *getProfile(
    payload: Payload<typeof getProfile>,
    { api }: SagasContext
  ) {
    try {
      yield put(preloader.show(PreloaderEnum.Profile));
      const response: object = yield call(api.general.getProfile, payload);
      yield put(getProfile.submit(response));
    } catch (error) {
    } finally {
      yield put(preloader.hide());
    }
  }
  @Saga(getProfileMatches)
  public *getProfileMatches(
    payload: Payload<typeof getProfileMatches>,
    { api }: SagasContext
  ) {
    try {
      yield put(preloader.show(PreloaderEnum.Profile));
      const response: object[] = yield call(
        api.general.getProfileRecentMatch,
        payload.id,
        payload.count
      );
      yield put(getProfileMatches.submit(response));
    } catch (error) {
      console.log(error);
    } finally {
      yield put(preloader.hide());
    }
  }

  @Saga(getMatch)
  public *getMatch(payload: Payload<typeof getMatch>, { api }: SagasContext) {
    try {
      yield put(preloader.show(PreloaderEnum.MatchDetail));
      const response: object = yield call(api.general.getMatch, payload);
      yield put(getMatch.submit(response));
    } catch (error) {
    } finally {
      yield put(preloader.hide());
    }
  }

  @Saga(getPlayerHeroes)
  public *getPlayerHeroes(
    payload: Payload<typeof getPlayerHeroes>,
    { api }: SagasContext
  ) {
    try {
      yield put(preloader.show(PreloaderEnum.Profile));
      const response: object[] = yield call(
        api.general.getPlayerHeroes,
        payload.id,
        payload.limit
      );
      yield put(getPlayerHeroes.submit(response));
    } catch (error) {
    } finally {
      yield put(preloader.hide(PreloaderEnum.Profile));
    }
  }
  @Saga(getWardMap)
  public *getWardMap(
    payload: Payload<typeof getWardMap>,
    { api }: SagasContext
  ) {
    try {
      yield put(preloader.show(PreloaderEnum.GetWardmap));
      const response: object = yield call(api.general.getWardMap, payload);
      yield put(getWardMap.submit(response));
    } catch (error) {
      console.log(error, "error");
    } finally {
      yield put(preloader.hide(PreloaderEnum.GetWardmap));
    }
  }

  @Saga(getHistograms)
  public *getHistograms(
    payload: Payload<typeof getHistograms>,
    { api }: SagasContext
  ) {
    try {
      yield put(preloader.show(PreloaderEnum.GetHistogram));
      const response: object[] = yield call(
        api.general.getHistogram,
        payload.id,
        payload.field
      );
      yield put(getHistograms.submit(response));
    } catch (error) {
      console.log(error);
    } finally {
      yield put(preloader.hide());
    }
  }

  // @Saga(addEl)
  // public *addEl(payload: Payload<typeof addEl>, { api }: SagasContext) {
  //   try {
  //     console.log(payload, 'in sagas');
  //     const response = yield call(api.general.addEl, payload.allData, payload.newData);
  //     yield put(addEl.sumbit(response));
  //   } catch (error) {}
  // }
  // @Saga(removeEl)
  // public *removeEl(payload: Payload<typeof removeEl>, { api }: SagasContext) {
  //   try {
  //     console.log(payload.id, 'pl id');

  //     const response = yield call(api.general.removeEl, payload.id, payload.allData);
  //     yield put(removeEl.submit(response));
  //   } catch (error) {}
  // }
  // @Saga(setPruductView)
  // public *setPruductView(payload: Payload<typeof setPruductView>, { api }: SagasContext) {
  //   try {
  //     const response = yield call(api.general.pruductView, payload);
  //     yield put(setPruductView.sumbit(response));
  //   } catch (error) {}
  // }
  // @Saga(addComment)
  // public *addComment(payload: Payload<typeof addComment>, { api }: SagasContext) {
  //   try {
  //     const response = yield call(api.general.addComment, payload.id, payload.commentData, payload.allData);

  //     yield put(addComment.submit(response));
  //   } catch (error) {}
  // }
  // @Saga(editProduct)
  // public *editProduct(payload: Payload<typeof editProduct>, { api }: SagasContext) {
  //   try {
  //     const response = yield call(api.general.editProduct, payload.id, payload.newValues, payload.allData);
  //     yield put(editProduct.submit(response));
  //   } catch (error) {}
  // }
}

export { GeneralSaga };
