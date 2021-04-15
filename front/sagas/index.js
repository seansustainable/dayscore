import { all, fork } from 'redux-saga/effects';

import postSaga from './post';
import userSaga from './user';
import actionSaga from './action';

export default function* rootSaga() { // 제너레이터
  yield all([
    fork(postSaga),
    fork(userSaga),
    fork(actionSaga),
  ]);
}
