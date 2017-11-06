import { fork } from 'redux-saga/effects';
import postsSaga from './posts';

export default function* rootSaga() {
    yield fork(postsSaga);
}
