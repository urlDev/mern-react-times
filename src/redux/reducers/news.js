import {
  FETCH_NEWS_ERROR,
  FETCH_POPULAR_SUCCESS,
  FETCH_STORY_SUCCESS,
  CHANGE_HEADER,
  CLEAN_STATE,
  CLEAR_ERROR,
  SET_WIDTH,
} from "../actions/news";

const initialState = {
  loadingNews: true,
  popular: [],
  story: [],
  errorNews: null,
  header: "home",
  width: window.innerWidth,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_STATE:
      return {
        ...initialState,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errorNews: null,
      };
    case FETCH_POPULAR_SUCCESS:
      return {
        ...state,
        loadingNews: false,
        popular: action.payload.results.slice(0, 4),
      };
    case FETCH_STORY_SUCCESS:
      return {
        ...state,
        loadingNews: false,
        story: action.payload.results.slice(0, 3),
      };
    case FETCH_NEWS_ERROR:
      return {
        ...state,
        errorNews: action.payload,
      };
    case CHANGE_HEADER:
      return {
        ...state,
        header: action.payload,
      };
    case SET_WIDTH:
      return {
        ...state,
        width: action.payload,
      };
    default:
      return state;
  }
};

export default newsReducer;
