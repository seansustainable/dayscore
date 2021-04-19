import { all, fork } from 'redux-saga/effects';

import axios from 'axios';
import postSaga from './post';
import userSaga from './user';
import actionSaga from './action';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export default function* rootSaga() { // 제너레이터
  yield all([
    fork(postSaga),
    fork(userSaga),
    fork(actionSaga),
  ]);
}
