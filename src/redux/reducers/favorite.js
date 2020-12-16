import {
  ADD_FAVORITE,
  DELETE_FAVORITE,
  GET_FAVORITE,
  FETCH_FAVORITE_ERROR,
} from "../actions/favorite";

const initialState = {
  errorFavorite: null,
  favorites: [],
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case DELETE_FAVORITE:
      return {
        ...state,
        favorites: [],
      };
    case GET_FAVORITE:
      return {
        ...state,
        favorites: action.payload,
      };
    case FETCH_FAVORITE_ERROR:
      return {
        ...state,
        errorFavorite: action.payload,
      };
    default:
      return state;
  }
};

export default favoriteReducer;
