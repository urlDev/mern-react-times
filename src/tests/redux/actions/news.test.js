import moxios from "moxios";

import * as NewsActions from "redux/actions/news";

import { story, popular, errorNews, width } from "../../fixtures/news";

import { store } from "../../store";

test("Should get the top stories correctly", () => {
  const action = NewsActions.fetchStorySuccess(story);

  expect(action).toEqual({
    type: NewsActions.FETCH_STORY_SUCCESS,
    payload: story,
  });
});

test("Should get the most popular stories correctly", () => {
  const action = NewsActions.fetchPopularSuccess(popular);

  expect(action).toEqual({
    type: NewsActions.FETCH_POPULAR_SUCCESS,
    payload: popular,
  });
});

test("Should show error if there is any", () => {
  const action = NewsActions.fetchNewsError(errorNews);

  expect(action).toEqual({
    type: NewsActions.FETCH_NEWS_ERROR,
    payload: errorNews,
  });
});

test("Should change the header", () => {
  const action = NewsActions.changeHeader("arts");

  expect(action).toEqual({
    type: NewsActions.CHANGE_HEADER,
    payload: "arts",
  });
});

test("Should clear the error", () => {
  const action = NewsActions.clearError();

  expect(action).toEqual({
    type: NewsActions.CLEAR_ERROR,
  });
});

test("Should set the width of the window", () => {
  const action = NewsActions.setWidth(width);

  expect(action).toEqual({
    type: NewsActions.SET_WIDTH,
    payload: width,
  });
});

test("Should open the responsive menu", () => {
  const action = NewsActions.openResponsiveMenu();

  expect(action).toEqual({
    type: NewsActions.OPEN_RESPONSIVE_MENU,
  });
});

test("Should close the responsive menu", () => {
  const action = NewsActions.closeResponsiveMenu();

  expect(action).toEqual({
    type: NewsActions.CLOSE_RESPONSIVE_MENU,
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
        type: NewsActions.FETCH_STORY_SUCCESS,
        payload: story.results,
      };

      return store.dispatch(NewsActions.fetchTopStories("home")).then(() => {
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
        type: NewsActions.FETCH_NEWS_ERROR,
        payload: errorNews,
      };

      return store.dispatch(NewsActions.fetchTopStories("home")).then(() => {
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
        type: NewsActions.FETCH_POPULAR_SUCCESS,
        payload: popular.results,
      };

      return store.dispatch(NewsActions.fetchMostPopular()).then(() => {
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
        type: NewsActions.FETCH_NEWS_ERROR,
        payload: errorNews,
      };

      return store.dispatch(NewsActions.fetchMostPopular()).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });
  });
});
