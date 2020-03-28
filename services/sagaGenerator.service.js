import { put, putResolve, call } from 'redux-saga/effects';
import { actionArr } from '../saga/watcher'
import { sagaMiddleware } from '../store';
import rootSaga from './../saga';
import store from './../store';



export function GenerateSaga(actionType, apiService) {
    if (!actionArr.filter(e => e.actionType === actionType).length) {
        actionArr.push({
            actionType: actionType, 
            sagaFunc: function* (payload) {
                        try {
                            const response = yield call(apiService, payload);
                            store.runSaga(rootSaga);
                            payload.callback && payload.callback(response);
                            store.dispatch({ type: (actionType + '_SUCCESS'), response})
                        } catch(error) {
                            store.dispatch({ type: (actionType + '_ERROR'), error })
                        }
                    }
        });
        store.runSaga(rootSaga);
    }
}