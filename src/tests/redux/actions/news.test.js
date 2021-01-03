import moxios from "moxios";

import {
  FETCH_POPULAR_SUCCESS,
  FETCH_STORY_SUCCESS,
  FETCH_NEWS_ERROR,
  CHANGE_HEADER,
  CLEAR_ERROR,
  SET_WIDTH,
  OPEN_RESPONSIVE_MENU,
  CLOSE_RESPONSIVE_MENU,
  fetchPopularSuccess,
  fetchStorySuccess,
  changeHeader,
  fetchNewsError,
  clearError,
  setWidth,
  openResponsiveMenu,
  closeResponsiveMenu,
  fetchTopStories,
  fetchMostPopular,
} from "../../../redux/actions/news";

import { story, popular, errorNews, width } from "../../fixtures/news";

// eslint-disable-next-line jest/no-mocks-import
import { store } from "../../__mocks__/store";

test("Should get the top stories correctly", () => {
  const action = fetchStorySuccess(story);

  expect(action).toEqual({
    type: FETCH_STORY_SUCCESS,
    payload: story,
  });
});

test("Should get the most popular stories correctly", () => {
  const action = fetchPopularSuccess(popular);

  expect(action).toEqual({
    type: FETCH_POPULAR_SUCCESS,
    payload: popular,
  });
});

test("Should show error if there is any", () => {
  const action = fetchNewsError(errorNews);

  expect(action).toEqual({
    type: FETCH_NEWS_ERROR,
    payload: errorNews,
  });
});

test("Should change the header", () => {
  const action = changeHeader("arts");

  expect(action).toEqual({
    type: CHANGE_HEADER,
    payload: "arts",
  });
});

test("Should clear the error", () => {
  const action = clearError();

  expect(action).toEqual({
    type: CLEAR_ERROR,
  });
});

test("Should set the width of the window", () => {
  const action = setWidth(width);

  expect(action).toEqual({
    type: SET_WIDTH,
    payload: width,
  });
});

test("Should open the responsive menu", () => {
  const action = openResponsiveMenu();

  expect(action).toEqual({
    type: OPEN_RESPONSIVE_MENU,
  });
});

test("Should close the responsive menu", () => {
  const action = closeResponsiveMenu();

  expect(action).toEqual({
    type: CLOSE_RESPONSIVE_MENU,
  });
});

describe("Testing redux-thunk, fetching news", () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("Testing top stories fetch", () => {
    test("Should fetch top stories successfully", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: story,
        });
      });

      const expectedActions = {
        type: FETCH_STORY_SUCCESS,
        payload: story.results,
      };

      return store.dispatch(fetchTopStories("home")).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });

    test("Should show error if theres any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorNews);
      });

      const expectedActions = {
        type: FETCH_NEWS_ERROR,
        payload: errorNews,
      };

      return store.dispatch(fetchTopStories("home")).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });
  });

  describe("Testing most popular fetch", () => {
    test("Should fetch most popular stories from API", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: popular,
        });
      });

      const expectedActions = {
        type: FETCH_POPULAR_SUCCESS,
        payload: popular.results,
      };

      return store.dispatch(fetchMostPopular()).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });

    test("Should show error if any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorNews);
      });

      const expectedActions = {
        type: FETCH_NEWS_ERROR,
        payload: errorNews,
      };

      return store.dispatch(fetchMostPopular()).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });
  });
});
