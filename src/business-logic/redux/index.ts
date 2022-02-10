import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore as reduxCreateStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { run } from 'redux-chill';
import { ApiService, HttpService } from '../services';
import { History } from 'history';
import { SagasContext, rootReducer, rootSagas } from './config';

/**
 * Create redux store
 */
const createStore = (history: History) => {
  const sagaMiddleware = createSagaMiddleware({
    onError: (error) => console.log(error, 'Saga error occured')
  });

  const store = reduxCreateStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

  const http = new HttpService();

  const context: SagasContext = {
    // history,
    api: new ApiService(http)
  };

  run(sagaMiddleware, rootSagas, context);
  return store;
};

export { createStore };