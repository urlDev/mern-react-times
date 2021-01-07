import moxios from "moxios";

import * as FavoriteActions from "redux/actions/favorite";

import { store } from "tests/store";

import {
  errorFavorite,
  favorite,
  favorites,
  stock,
  id,
} from "tests/fixtures/favorite";

test("Should add stock to favorite", () => {
  const action = FavoriteActions.addFavorite(stock);

  expect(action).toEqual({
    type: FavoriteActions.ADD_FAVORITE,
    payload: stock,
  });
});

test("Should get favorite", () => {
  const action = FavoriteActions.getFavorite(favorite);

  expect(action).toEqual({
    type: FavoriteActions.GET_FAVORITE,
    payload: favorite,
  });
});

test("Should delete stock from favorites", () => {
  const action = FavoriteActions.deleteFavorite(stock);

  expect(action).toEqual({
    type: FavoriteActions.DELETE_FAVORITE,
    payload: stock,
  });
});

test("Should show an error if there is any", () => {
  const action = FavoriteActions.fetchFavoriteError(errorFavorite);

  expect(action).toEqual({
    type: FavoriteActions.FETCH_FAVORITE_ERROR,
    payload: errorFavorite,
  });
});

test("Should clean the favorites state", () => {
  const action = FavoriteActions.cleanFavoriteState();

  expect(action).toEqual({
    type: FavoriteActions.CLEAN_FAVORITE_STATE,
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
        type: FavoriteActions.GET_FAVORITE,
        payload: favorites,
      };

      return store.dispatch(FavoriteActions.fetchGetFavorites()).then(() => {
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
        type: FavoriteActions.FETCH_FAVORITE_ERROR,
        payload: errorFavorite,
      };

      return store.dispatch(FavoriteActions.fetchGetFavorites()).then(() => {
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
        type: FavoriteActions.ADD_FAVORITE,
        payload: favorite.symbol[0],
      };

      return store
        .dispatch(FavoriteActions.fetchAddFavorites(stock))
        .then(() => {
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
        type: FavoriteActions.FETCH_FAVORITE_ERROR,
        payload: errorFavorite,
      };

      return store
        .dispatch(FavoriteActions.fetchAddFavorites(favorite))
        .then(() => {
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
        type: FavoriteActions.DELETE_FAVORITE,
        payload: favorite,
      };

      return store
        .dispatch(FavoriteActions.fetchDeleteFavorite(id))
        .then(() => {
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
        type: FavoriteActions.FETCH_FAVORITE_ERROR,
        payload: errorFavorite,
      };

      return store
        .dispatch(FavoriteActions.fetchDeleteFavorite(id))
        .then(() => {
          const actionsGetCalled = store.getActions();

          expect(actionsGetCalled[0]).toEqual(expectedActions);
        });
    });
  });
});
