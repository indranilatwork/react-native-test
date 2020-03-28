import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger'
import rootReducer from './reducers';
import rootSaga from './saga';

export const sagaMiddleware = createSagaMiddleware();
const configureStore = () => {
  return {
    
    ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
    runSaga: sagaMiddleware.run,
    // rerunSaga: () => sagaMiddleware.run(rootSaga)
  }
};

const store = configureStore()
store.runSaga(rootSaga);

export default store;