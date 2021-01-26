import axios from "axios";
import toaster from "toasted-notes";

import NotificationComponent from "../../components/notification-component/NotificationComponent";

const url = "https://urldev-mern-react-times-api.herokuapp.com";
// const url = `http://localhost:3000`;

export const GET_FAVORITE = "GET_FAVORITE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const FETCH_FAVORITE_ERROR = "FETCH_FAVORITE_ERROR";
export const CLEAN_FAVORITE_STATE = "CLEAN_FAVORITE_STATE";

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

export const cleanFavoriteState = () => ({
  type: CLEAN_FAVORITE_STATE,
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
    return [
      dispatch(addFavorite(data.symbol[0])),
      toaster.notify(
        () => (
          <NotificationComponent
            success={true}
            text={`You added ${data.symbol[0].name
              .split("^")
              .join("")} to your favorites successfully.`}
          />
        ),
        { duration: 1500 }
      ),
    ];
  } catch (error) {
    return [
      dispatch(fetchFavoriteError(error)),
      toaster.notify(
        () => (
          <NotificationComponent
            success={false}
            text={`We just broke something, try again please or refresh.`}
          />
        ),
        { duration: 1500 }
      ),
    ];
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
    return [
      dispatch(deleteFavorite(data)),
      toaster.notify(
        () => (
          <NotificationComponent
            success={true}
            text={`You deleted ${data.symbol[0].name
              .split("^")
              .join("")} from your favorites.`}
          />
        ),
        { duration: 1500 }
      ),
    ];
  } catch (error) {
    return [
      dispatch(fetchFavoriteError(error)),
      toaster.notify(
        () => (
          <NotificationComponent
            success={false}
            text={`We just broke something, try again please or refresh.`}
          />
        ),
        { duration: 1500 }
      ),
    ];
  }
};
