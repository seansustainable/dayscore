import axios from 'axios';
import shortId from 'shortid';
import { all, delay, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import {
  generateDummyAction,
  LOAD_ACTIONS_FAILURE,
  LOAD_ACTIONS_REQUEST,
  LOAD_ACTIONS_SUCCESS,
  ADD_ACTION_FAILURE,
  ADD_ACTION_REQUEST,
  ADD_ACTION_SUCCESS,
  REMOVE_ACTION_FAILURE,
  REMOVE_ACTION_REQUEST,
  REMOVE_ACTION_SUCCESS,
} from '../reducers/action';
import { ADD_ACTION_TO_ME, REMOVE_ACTION_OF_ME } from '../reducers/user';

function loadActionsAPI(data) {
  return axios.get('/actions', data);
}

function* loadActions(action) {
  try {
    const result = yield call(loadActionsAPI, action.data);
    // yield delay(1000);
    yield put({
      type: LOAD_ACTIONS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_ACTIONS_FAILURE,
      error: err.response.data,
    });
  }
}

function addActionAPI(data) {
  return axios.post('/action', data);
}

function* addAction(action) {
  try {
    const result = yield call(addActionAPI, action.data);
    // yield delay(1000);
    // const id = shortId.generate();
    yield put({
      type: ADD_ACTION_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_ACTION_TO_ME,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_ACTION_FAILURE,
      error: err.response.data,
    });
  }
}

function removeActionAPI(data) {
  return axios.delete(`/action/${data}`);
}

function* removeAction(action) {
  try {
    const result = yield call(removeActionAPI, action.data);
    // yield delay(1000);
    yield put({
      type: REMOVE_ACTION_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_ACTION_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_ACTION_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadActions() {
  yield throttle(5000, LOAD_ACTIONS_REQUEST, loadActions);
}

function* watchAddAction() {
  yield takeLatest(ADD_ACTION_REQUEST, addAction);
}

function* watchRemoveAction() {
  yield takeLatest(REMOVE_ACTION_REQUEST, removeAction);
}

export default function* actionSaga() {
  yield all([
    fork(watchLoadActions),
    fork(watchAddAction),
    fork(watchRemoveAction),
  ]);
}
