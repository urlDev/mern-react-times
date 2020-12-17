import axios from "axios";

const url = "https://urldev-mern-react-times-api.herokuapp.com";

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

export const deleteFavorite = (stock) => ({
  type: DELETE_FAVORITE,
  payload: stock,
});

export const fetchFavoriteError = (error) => ({
  type: FETCH_FAVORITE_ERROR,
  payload: error,
});

export const fetchGetFavorites = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(`${url}/`, config);
    const data = await response.data;
    return dispatch(getFavorite(data));
  } catch (error) {
    return dispatch(fetchFavoriteError(error));
  }
};

export const fetchAddFavorites = (stock) => async (dispatch) => {
  const favoriteStock = {
    symbol: stock,
  };

  const token = JSON.parse(localStorage.getItem("token"));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.post(`${url}/`, favoriteStock, config);
    const data = await response.data;
    return dispatch(addFavorite(data.symbol[0]));
  } catch (error) {
    return dispatch(fetchFavoriteError(error));
  }
};

export const fetchDeleteFavorite = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.delete(`${url}/${id}`, config);
    const data = await response.data;
    return dispatch(deleteFavorite(data));
  } catch (error) {
    return dispatch(fetchFavoriteError(error));
  }
};
