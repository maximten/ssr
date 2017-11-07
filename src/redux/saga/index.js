import { fork } from 'redux-saga/effects';
import postsSaga from './posts';
import userSaga from './user';

export default function* rootSaga() {
    yield fork(postsSaga);
    yield fork(userSaga);
}
