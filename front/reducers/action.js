import shortId from 'shortid';
import faker from 'faker';
import produce from '../util/produce';
import { REMOVE_POST_FAILURE } from './post';

export const initialState = {
  mainActions: [
    { id: 1,
      title: '물 마시기',
      description: '하루에 물 7잔 마시기',
      score: 1,
      User: {
        id: 1,
        nickname: 'Sean',
      } },
    { id: 2,
      title: '커밋 하기',
      description: '1일 1커밋 이상',
      score: 2,
      User: {
        id: 1,
        nickname: 'Sean',
      } },
    { id: 3,
      title: '블로그 포스팅하기',
      description: '1일 1포스팅 이상',
      score: 3,
      User: {
        id: 1,
        nickname: 'Sean',
      } },
  ],
  loadActionsLoading: false,
  loadActionsDone: false,
  loadActionsError: null,
  addActionLoading: false,
  addActionDone: false,
  addActionError: null,
  removeActionLoading: false,
  removeActionDone: false,
  removeActionError: null,
  addScoresDone: false,
  addScoresError: null,
  removeScoresLoading: false,
  removeScoresDone: false,
  removeScoresError: null,
};

export const LOAD_ACTIONS_REQUEST = 'LOAD_ACTIONS_REQUEST';
export const LOAD_ACTIONS_SUCCESS = 'LOAD_ACTIONS_SUCCESS';
export const LOAD_ACTIONS_FAILURE = 'LOAD_ACTIONS_FAILURE';

export const ADD_ACTION_REQUEST = 'ADD_ACTION_REQUEST';
export const ADD_ACTION_SUCCESS = 'ADD_ACTION_SUCCESS';
export const ADD_ACTION_FAILURE = 'ADD_ACTION_FAILURE';

export const REMOVE_ACTION_REQUEST = 'REMOVE_ACTION_REQUEST';
export const REMOVE_ACTION_SUCCESS = 'REMOVE_ACTION_SUCCESS';
export const REMOVE_ACTION_FAILURE = 'REMOVE_ACTION_FAILURE';

export const generateDummyAction = (number) => Array(number).fill().map(() => ({
  id: shortId.generate(),
  User: {
    id: shortId.generate(),
    nickname: faker.name.findName(),
  },
  title: faker.lorem.word(),
  description: faker.lorem.sentences(),
  score: faker.random.number(),
}));

const dummyAction = (data) => ({
  id: data.id,
  title: data.title,
  description: data.description,
  score: data.score,
  User: {
    id: 1,
    nickname: 'Sean',
  },
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_ACTIONS_REQUEST:
      draft.loadActionsLoading = true;
      draft.loadActionsError = null;
      draft.loadActionsDone = false;
      break;
    case LOAD_ACTIONS_SUCCESS:
      draft.loadActionsLoading = false;
      draft.loadActionsDone = true;
      draft.mainActions = action.data.concat(draft.mainActions);
      draft.hasMoreActions = draft.mainActions.length < 50;
      break;
    case LOAD_ACTIONS_FAILURE:
      draft.loadActionsLoading = false;
      draft.loadActionsError = action.error;
      break;
    case ADD_ACTION_REQUEST:
      draft.addActionLoading = true;
      draft.addActionError = null;
      draft.addActionDone = false;
      break;
    case ADD_ACTION_SUCCESS:
      draft.addActionLoading = false;
      draft.addActionDone = true;
      draft.mainActions.unshift(action.data);
      break;
    case ADD_ACTION_FAILURE:
      draft.addActionLoading = false;
      draft.addActionError = action.error;
      break;
    case REMOVE_ACTION_REQUEST:
      draft.removeActionLoading = true;
      draft.removeActionError = null;
      draft.removeActionDone = false;
      break;
    case REMOVE_ACTION_SUCCESS:
      draft.removeActionLoading = false;
      draft.removeActionDone = true;
      draft.mainActions = draft.mainActions.filter((v) => v.id !== action.data);
      break;
    case REMOVE_ACTION_FAILURE:
      draft.removeActionLoading = false;
      draft.removeActionError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
