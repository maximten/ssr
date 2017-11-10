import { put, fork, call } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';

import Types from '../constants/types';

import * as api from '../api/user';

function* register(action) {
  const { formData } = action;
  try {
    const user = yield call(api.register, formData);
    yield put({ type: Types.USER_REGISTER.SUCCESS, user });
  } catch (error) {
    yield put({ type: Types.USER_REGISTER.FAILURE, error });
  }
}

function* login(action) {
  const { formData } = action;
  try {
    const user = yield call(api.login, formData);
    yield put({ type: Types.USER_LOGIN.SUCCESS, user });
  } catch (error) {
    yield put({ type: Types.USER_LOGIN.FAILURE, error });
  }
}

function* watchStatements() {
  yield takeEvery(Types.USER_REGISTER.REQUEST, register);
  yield takeEvery(Types.USER_LOGIN.REQUEST, login);
}

export default function* statementsSaga() {
  yield fork(watchStatements);
}
