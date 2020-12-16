import axios from "axios";

const url = "https://urldev-mern-react-times-api.herokuapp.com";

const token = JSON.parse(localStorage.getItem("token"));

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const GET_FAVORITE = "GET_FAVORITE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const FETCH_FAVORITE_ERROR = "FETCH_FAVORITE_ERROR";

export const getFavorite = (stock) => ({
  type: GET_FAVORITE,
  payload: stock,
});

export const addFavorite = (stock) => ({
  type: ADD_FAVORITE,
  payload: stock,
});

export const deleteFavorite = () => ({
  type: DELETE_FAVORITE,
});

export const fetchFavoriteError = (error) => ({
  type: FETCH_FAVORITE_ERROR,
  payload: error,
});

export const fetchGetFavorites = () => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/`, config);
    const data = await response.data;
    console.log(data);
  } catch (error) {
    return dispatch(fetchFavoriteError(error));
  }
};

export const fetchAddFavorites = (stock) => async (dispatch) => {
  const favoriteStock = {
    symbol: stock,
  };

  try {
    const response = await axios.post(`${url}/`, favoriteStock, config);
    const data = await response;
    console.log(data);
  } catch (error) {
    return dispatch(fetchFavoriteError(error));
  }
};
