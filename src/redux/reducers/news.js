import * as NewsActions from "redux/actions/news";

const initialState = {
  loadingNews: true,
  popular: [],
  story: [],
  errorNews: null,
  header: "home",
  width: window.innerWidth,
  responsiveMenu: false,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NewsActions.CLEAR_ERROR:
      return {
        ...state,
        errorNews: null,
      };
    case NewsActions.FETCH_POPULAR_SUCCESS:
      return {
        ...state,
        loadingNews: false,
        popular: action.payload,
      };
    case NewsActions.FETCH_STORY_SUCCESS:
      return {
        ...state,
        loadingNews: false,
        story: action.payload,
      };
    case NewsActions.FETCH_NEWS_ERROR:
      return {
        ...state,
        errorNews: action.payload,
      };
    case NewsActions.CHANGE_HEADER:
      return {
        ...state,
        header: action.payload,
      };
    case NewsActions.SET_WIDTH:
      return {
        ...state,
        width: action.payload,
      };
    case NewsActions.OPEN_RESPONSIVE_MENU:
      return {
        ...state,
        responsiveMenu: true,
      };
    case NewsActions.CLOSE_RESPONSIVE_MENU:
      return {
        ...state,
        responsiveMenu: false,
      };
    default:
      return state;
  }
};

export default newsReducer;
