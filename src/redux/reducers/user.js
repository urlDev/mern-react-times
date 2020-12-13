import {
    REGISTER_USER,
    LOGOUT_USER,
    LOGIN_USER,
    SET_TOKEN,
    USER_FETCH_ERROR,
    USER_LOADING,
    USER_LOADING_END,
    USER_MODAL_OPEN,
    USER_MODAL_CLOSE,
} from '../actions/user';

const initialState = {
    loadingUser: false,
    errorUser: null,
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: JSON.parse(localStorage.getItem('token')) || {},
    userModal: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload,
            };
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: {},
                token: {},
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
        case USER_MODAL_OPEN:
            return {
                ...state,
                userModal: true,
            };
        case USER_MODAL_CLOSE:
            return {
                ...state,
                userModal: false,
            };
        default:
            return state;
    }
};

export default userReducer;