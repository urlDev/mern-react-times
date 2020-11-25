import {
    FETCH_NEWS_ERROR,
    FETCH_POPULAR_SUCCESS,
    FETCH_STORY_SUCCESS,
    CHANGE_HEADER
} from '../actions/news';

const initialState = {
    loading: true,
    popular: [],
    story: [],
    error: null,
    header: 'Arts'
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POPULAR_SUCCESS:
            return {
                ...state,
                popular: action.payload.results,
            };
        case FETCH_STORY_SUCCESS:
            return {
                ...state,
                loading: false,
                story: action.payload.results,
            };
        case FETCH_NEWS_ERROR:
            return {
                ...state,
                news: [],
                error: action.payload,
            };
        case CHANGE_HEADER:
            return {
                ...state,
                header: action.payload
            }
        default:
            return state;
    }
};

export default newsReducer;