import favoriteReducer from "../../../redux/reducers/favorite";

import * as FavoriteActions from "redux/actions/favorite";

import { errorFavorite, favorite, stock } from "../../fixtures/favorite";

const initialState = {
  errorFavorite: null,
  favorites: [favorite],
};

test("Should return default state", () => {
  const state = favoriteReducer(undefined, {});

  //   for testing reducer, jest expects the initialState to be the exact same
  // from the one in reducer. Setting initial state in here isnt the same.
  // Otherwise, reducer looks like its not covered.
  expect(state).toEqual({ errorFavorite: null, favorites: [] });
});

test("Should add stock to favorites", () => {
  const state = favoriteReducer(initialState, {
    type: FavoriteActions.ADD_FAVORITE,
    payload: stock,
  });

  expect(state).toEqual({
    ...initialState,
    favorites: [...initialState.favorites, stock],
  });
});

test("Should delete stock from favorites", () => {
  const state = favoriteReducer(initialState, {
    type: FavoriteActions.DELETE_FAVORITE,
    payload: favorite,
  });

  expect(state).toEqual({
    ...initialState,
    favorites: initialState.favorites.filter(
      (favoriteStock) => favoriteStock._id !== favorite._id
    ),
  });
});

test("Should get favorites", () => {
  const state = favoriteReducer(initialState, {
    type: FavoriteActions.GET_FAVORITE,
    payload: favorite,
  });

  expect(state).toEqual({
    ...initialState,
    favorites: favorite,
  });
});

test("Should show error if there is any", () => {
  const state = favoriteReducer(initialState, {
    type: FavoriteActions.FETCH_FAVORITE_ERROR,
    payload: errorFavorite,
  });

  expect(state).toEqual({
    ...initialState,
    errorFavorite,
  });
});

test("Should clean the favorite state", () => {
  const state = favoriteReducer(initialState, {
    type: FavoriteActions.CLEAN_FAVORITE_STATE,
  });

  expect(state).toEqual({
    ...initialState,
    favorites: [],
  });
});
