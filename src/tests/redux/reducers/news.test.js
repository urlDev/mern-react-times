import newsReducer from "../../../redux/reducers/news";

import {
  FETCH_POPULAR_SUCCESS,
  FETCH_STORY_SUCCESS,
  FETCH_NEWS_ERROR,
  CHANGE_HEADER,
  CLEAR_ERROR,
  SET_WIDTH,
  OPEN_RESPONSIVE_MENU,
  CLOSE_RESPONSIVE_MENU,
} from "../../../redux/actions/news";

import { story, popular, errorNews, width } from "../../fixtures/news";

const initialState = {
  loadingNews: true,
  popular: [],
  story: [],
  errorNews: null,
  header: "home",
  width: window.innerWidth,
  responsiveMenu: false,
};

test("Should set the initial state successfully", () => {
  const state = newsReducer(undefined, {});

  expect(state).toEqual({
    loadingNews: true,
    popular: [],
    story: [],
    errorNews: null,
    header: "home",
    width: window.innerWidth,
    responsiveMenu: false,
  });
});

test("Should clear the error", () => {
  const state = newsReducer(initialState, { type: CLEAR_ERROR });

  expect(state).toEqual({
    ...initialState,
    errorNews: null,
  });
});

test("Should fetch popular news successfully", () => {
  const state = newsReducer(initialState, {
    type: FETCH_POPULAR_SUCCESS,
    payload: popular,
  });

  expect(state).toEqual({
    ...initialState,
    popular,
    loadingNews: false,
  });
});

test("Should fetch top stories successfully", () => {
  const state = newsReducer(initialState, {
    type: FETCH_STORY_SUCCESS,
    payload: story,
  });

  expect(state).toEqual({
    ...initialState,
    story,
    loadingNews: false,
  });
});

test("Should show error if there is any", () => {
  const state = newsReducer(initialState, {
    type: FETCH_NEWS_ERROR,
    payload: errorNews,
  });

  expect(state).toEqual({
    ...initialState,
    errorNews,
  });
});

test("Should change header successfully", () => {
  const state = newsReducer(initialState, {
    type: CHANGE_HEADER,
    payload: "home",
  });

  expect(state).toEqual({
    ...initialState,
    header: "home",
  });
});

test("Should set width of the window", () => {
  const state = newsReducer(initialState, { type: SET_WIDTH, payload: width });

  expect(state).toEqual({
    ...initialState,
    width,
  });
});

test("Should open the responsive menu", () => {
  const state = newsReducer(initialState, { type: OPEN_RESPONSIVE_MENU });

  expect(state).toEqual({
    ...initialState,
    responsiveMenu: true,
  });
});

test("Should close the responsive menu", () => {
  const state = newsReducer(initialState, { type: CLOSE_RESPONSIVE_MENU });

  expect(state).toEqual({
    ...initialState,
    responsiveMenu: false,
  });
});
