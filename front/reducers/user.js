const dummyUser = {
    id: 1,
    nickname: 'Sean',
    Posts: [],
    Followings: [],
    Followers: [],
};

export const initialState = {
    isLoggedIn: false,
    me: null,
    signUpData: {},
    loginData: {},
};

export const CHANGE_NICKNAME = 'CHANGE_NICKNAME';
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

// async action creator -> saga
// action creator
const changeNickname = (data) => {
    return {
        type: CHANGE_NICKNAME,
        data,
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                me: dummyUser,
                loginData: action.data,
            };
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                me: null,
            };
        }
        case SIGN_UP: {
            return {
                ...state,
                signUpData: action.data,
            };
        }
        default: {
            return {
                ...state,
            }
        }
    }
};