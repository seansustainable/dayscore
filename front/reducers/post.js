import produce from '../util/produce';
import shortId from 'shortid';
import faker from 'faker';

// export const initialState = {
//     mainPosts: [{
//         id: 1,
//         User: {
//             id: 1,
//             nickname: 'Sean',
//         },
//         content: 'initial post',
//         Images: [{
//             src: 'https://img.segye.com/content/image/2019/10/11/20191011508687.jpg',
//         }, {
//             src: 'https://t1.daumcdn.net/cfile/tistory/997D23485AF4613635',
//         }, {
//             src: 'http://menu.mt.co.kr/moneyweek/thumb/2019/12/04/06/2019120415218066596_1.jpg',
//         }],
//         Comments: [{
//             User: {
//                 nickname: '김첨지',
//             },
//             content: '블랙 모티브로 와~',
//         }, {
//             User: {
//                 nickname: '뭉',
//             },
//             content: '홧팅! 😄',
//         }]
//     }],
//     imagePaths: [],
//     postAdded: false,
// };

export const initialState = {
    mainPosts: [],
    imagePaths: [],
    hasMorePosts: true,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
};

export const generateDummyPost = (number) => Array(number).fill().map(() => ({
    id: shortId.generate(),
    User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
        src: faker.image.image(),
    }],
    Comments: [{
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
        },
        content: faker.lorem.sentence(),
    }],
}));

const dummyPost = (data) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: 'Sean',
    },
    Images: [],
    Comments: [],
});

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: 'Sean',
    },
});

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

// const dummyPost = {
//     id: 2,
//     content: 'dummy post',
//     User: {
//         id: 1,
//         nickname: 'Sean',
//     },
//     Images: [],
//     Comments: [],
// };

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        case LOAD_POSTS_REQUEST:
            draft.loadPostsLoading = true;
            draft.loadPostsError = null;
            draft.loadPostsDone = false;
            break;
        case LOAD_POSTS_SUCCESS:
            draft.loadPostsLoading = false;
            draft.loadPostsDone = true;
            draft.mainPosts = action.data.concat(draft.mainPosts);
            draft.hasMorePosts = draft.mainPosts.length < 50;
            break;
        case LOAD_POSTS_FAILURE:
            draft.loadPostsLoading = false;
            draft.loadPostsError = action.error;
            break;
        case ADD_POST_REQUEST:
            draft.addPostLoading = true;
            draft.addPostError = null;
            draft.addPostDone = false;
            break;
        case ADD_POST_SUCCESS:
            draft.addPostLoading = false;
            draft.addPostDone = true;
            draft.mainPosts.unshift(dummyPost(action.data));
            break;
        case ADD_POST_FAILURE:
            draft.addPostLoading = false;
            draft.addPostError = action.error;
            break;
        case REMOVE_POST_REQUEST:
            draft.removePostLoading = true;
            draft.removePostError = null;
            draft.removePostDone = false;
            break;
        case REMOVE_POST_SUCCESS:
            draft.removePostLoading = false;
            draft.removePostDone = true;
            draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
            break;
        case REMOVE_POST_FAILURE:
            draft.removePostLoading = false;
            draft.removePostError = action.error;
            break;
        case ADD_COMMENT_REQUEST:
            draft.addCommentLoading = true;
            draft.addCommentError = null;
            draft.addCommentDone = false;
            break;
        case ADD_COMMENT_SUCCESS: {
            const post = draft.mainPosts.find((v) => v.id === action.data.postId);
            post.Comments.unshift(dummyComment(action.data.content));
            draft.addCommentLoading = false;
            draft.addCommentDone = true;
            break;
            // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
            // const post = { ...state.mainPosts[postIndex] };
            // post.Comments = [dummyComment(action.data.content), ...post.Comments];
            // const mainPosts = [...state.mainPosts];
            // mainPosts[postIndex] = post;
            // return {
            //   ...state,
            //   mainPosts,
            //   addCommentLoading: false,
            //   addCommentDone: true,
            // };
        }
        case ADD_COMMENT_FAILURE:
            draft.addCommentLoading = false;
            draft.addCommentError = action.error;
            break;
        default:
            break;
    }
});

export default reducer;