export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'Sean',
        },
        content: 'initial post',
        Images: [{
            src: 'https://img.segye.com/content/image/2019/10/11/20191011508687.jpg',
        }, {
            src: 'https://t1.daumcdn.net/cfile/tistory/997D23485AF4613635',
        }, {
            src: 'http://menu.mt.co.kr/moneyweek/thumb/2019/12/04/06/2019120415218066596_1.jpg',
        }],
        Comments: [{
            User: {
                nickname: '김첨지',
            },
            content: '블랙 모티브로 와~',
        }, {
            User: {
                nickname: '뭉',
            },
            content: '홧팅! 😄',
        }]
    }],
    imagePaths: [],
    postAdded: false,
};

const ADD_POST = 'ADD_POST';

export const addPost = {
    type: ADD_POST,
};

const dummyPost = {
    id: 2,
    content: 'dummy post',
    User: {
        id: 1,
        nickname: 'Sean',
    },
    Images: [],
    Comments: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};