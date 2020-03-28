import { takeLatest, takeEvery } from 'redux-saga/effects';
import * as types from '../actions/types';

export const actionArr = []

export function* watchActions() {
  // Declare every saga here with the action type
  // Ex:  yield takeLatest(types.ACTION_TYPE, sagaGeneratorFunction);
  for(let i in actionArr) {
    yield takeLatest(actionArr[i].actionType, actionArr[i].sagaFunc)
  }
}




