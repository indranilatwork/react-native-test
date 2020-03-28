import { fork } from 'redux-saga/effects';
import { watchActions } from './watcher';
// import { } from './watcher';

export default function* sagaStarter() {
    yield fork(watchActions)
}