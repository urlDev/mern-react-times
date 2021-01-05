import moxios from "moxios";

import {
  ADD_FAVORITE,
  DELETE_FAVORITE,
  GET_FAVORITE,
  FETCH_FAVORITE_ERROR,
  CLEAN_FAVORITE_STATE,
  getFavorite,
  addFavorite,
  deleteFavorite,
  fetchFavoriteError,
  cleanFavoriteState,
  fetchGetFavorites,
  fetchAddFavorites,
  fetchDeleteFavorite,
} from "../../../redux/actions/favorite";

import { store } from "../../store";

import {
  errorFavorite,
  favorite,
  favorites,
  stock,
  id,
} from "../../fixtures/favorite";

test("Should add stock to favorite", () => {
  const action = addFavorite(stock);

  expect(action).toEqual({
    type: ADD_FAVORITE,
    payload: stock,
  });
});

test("Should get favorite", () => {
  const action = getFavorite(favorite);

  expect(action).toEqual({
    type: GET_FAVORITE,
    payload: favorite,
  });
});

test("Should delete stock from favorites", () => {
  const action = deleteFavorite(stock);

  expect(action).toEqual({
    type: DELETE_FAVORITE,
    payload: stock,
  });
});

test("Should show an error if there is any", () => {
  const action = fetchFavoriteError(errorFavorite);

  expect(action).toEqual({
    type: FETCH_FAVORITE_ERROR,
    payload: errorFavorite,
  });
});

test("Should clean the favorites state", () => {
  const action = cleanFavoriteState();

  expect(action).toEqual({
    type: CLEAN_FAVORITE_STATE,
  });
});

describe("Testing async functions", () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("Testing fetchGetFavorites async function", () => {
    test("Should get favorite stocks from db successfully", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: favorites,
        });
      });

      const expectedActions = {
        type: GET_FAVORITE,
        payload: favorites,
      };

      return store.dispatch(fetchGetFavorites()).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });

    test("Should show error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorFavorite);
      });

      const expectedActions = {
        type: FETCH_FAVORITE_ERROR,
        payload: errorFavorite,
      };

      return store.dispatch(fetchGetFavorites()).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });
  });

  describe("Testing fetchAddFavorites async function", () => {
    test("Should add stock to favorites successfully", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: favorite,
        });
      });

      const expectedActions = {
        type: ADD_FAVORITE,
        payload: favorite.symbol[0],
      };

      return store.dispatch(fetchAddFavorites(stock)).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });

    test("Should show error if theres any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorFavorite);
      });

      const expectedActions = {
        type: FETCH_FAVORITE_ERROR,
        payload: errorFavorite,
      };

      return store.dispatch(fetchAddFavorites(favorite)).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });
  });

  describe("Testing fetchDeleteError async function", () => {
    test("Should delete stock from favorites successfully", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: favorite,
        });
      });

      const expectedActions = {
        type: DELETE_FAVORITE,
        payload: favorite,
      };

      return store.dispatch(fetchDeleteFavorite(id)).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });
    test("Should show error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorFavorite);
      });

      const expectedActions = {
        type: FETCH_FAVORITE_ERROR,
        payload: errorFavorite,
      };

      return store.dispatch(fetchDeleteFavorite(id)).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });
  });
});
