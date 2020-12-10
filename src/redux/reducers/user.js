import {
    REGISTER_USER,
    SET_TOKEN,
    USER_FETCH_ERROR,
    USER_LOADING,
    USER_LOADING_END,
} from '../actions/user';

const initialState = {
    loadingUser: false,
    errorUser: null,
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: JSON.parse(localStorage.getItem('token')) || {},
};

const userReducer = (state = initialState, action) => {
    switch (action.payload) {
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case USER_FETCH_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true,
            };
        case USER_LOADING_END:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default userReducer;