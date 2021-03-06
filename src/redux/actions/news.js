import axios from "axios";

export const FETCH_POPULAR_SUCCESS = "FETCH_POPULAR_SUCCESS";
export const FETCH_STORY_SUCCESS = "FETCH_STORY_SUCCESS";
export const FETCH_NEWS_ERROR = "FETCH_NEWS_ERROR";
export const CHANGE_HEADER = "CHANGE_HEADER";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_WIDTH = "SET_WIDTH";
export const OPEN_RESPONSIVE_MENU = "OPEN_RESPONSIVE_MENU";
export const CLOSE_RESPONSIVE_MENU = "CLOSE_RESPONSIVE_MENU";

export const setWidth = (width) => ({
  type: SET_WIDTH,
  payload: width,
});

export const fetchPopularSuccess = (news) => ({
  type: FETCH_POPULAR_SUCCESS,
  payload: news,
});

export const fetchStorySuccess = (news) => ({
  type: FETCH_STORY_SUCCESS,
  payload: news,
});

export const changeHeader = (header) => ({
  type: CHANGE_HEADER,
  payload: header,
});

export const fetchNewsError = (error) => ({
  type: FETCH_NEWS_ERROR,
  payload: error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const openResponsiveMenu = () => ({
  type: OPEN_RESPONSIVE_MENU,
});

export const closeResponsiveMenu = () => ({
  type: CLOSE_RESPONSIVE_MENU,
});

export const fetchTopStories = (topStories) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/${topStories}.json?api-key=${process.env.REACT_APP_NEWS_API_KEY}`
    );
    const data = await response.data.results.slice(0, 3);
    return dispatch(fetchStorySuccess(data));
  } catch (error) {
    return dispatch(fetchNewsError(error));
  }
};

export const fetchMostPopular = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${process.env.REACT_APP_NEWS_API_KEY}`
    );
    const data = await response.data.results.slice(0, 4);
    return dispatch(fetchPopularSuccess(data));
  } catch (error) {
    return dispatch(fetchNewsError(error));
  }
};
