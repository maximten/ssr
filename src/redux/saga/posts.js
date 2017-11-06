import { put, fork, call } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';

import Types from '../constants/types';

import * as api from '../api/posts';

function* fetchPosts(action) {
  const { limit, skip } = action;
  const items = yield call(api.list, limit, skip);
  try {
    yield put({ type: Types.FETCH_POSTS.SUCCESS, items });
  } catch (error) {
    yield put({ type: Types.FETCH_POSTS.FAILURE, error });
  }
}

function* fetchPost(action) {
  const { slug } = action;
  const item = yield call(api.getBySlug, slug);
  try {
    yield put({ type: Types.FETCH_POST.SUCCESS, item });
  } catch (error) {
    yield put({ type: Types.FETCH_POST.FAILURE, error });
  }
}

function* watchStatements() {
  yield takeEvery(Types.FETCH_POSTS.REQUEST, fetchPosts);
  yield takeEvery(Types.FETCH_POST.REQUEST, fetchPost);
}

export default function* statementsSaga() {
  yield fork(watchStatements);
}
