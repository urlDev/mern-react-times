import axios from 'axios';
import toaster from 'toasted-notes';
import { push } from 'connected-react-router';

import NotificationComponent from '../../components/notification-component/NotificationComponent';

const url = process.env.REACT_APP_API_URL;

export const REGISTER_USER = 'REGISTER_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_USER = 'GET_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const USER_FETCH_ERROR = 'USER_FETCH_ERROR';
export const USER_LOADING = 'USER_LOADING';
export const USER_LOADING_END = 'USER_LOADING_END';
export const USER_MODAL_OPEN = 'USER_MODAL_OPEN';
export const USER_MODAL_CLOSE = 'USER_MODAL_CLOSE';
export const DELETE_MODAL_OPEN = 'DELETE_MODAL_OPEN';
export const DELETE_MODAL_CLOSE = 'DELETE_MODAL_CLOSE';
export const UPLOAD_AVATAR = 'UPLOAD_AVATAR';

export const registerUser = (user) => ({
  type: REGISTER_USER,
  payload: user,
});

export const logOutUser = () => ({
  type: LOGOUT_USER,
});

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

export const deleteUser = () => ({
  type: DELETE_USER,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const getUser = (user) => ({
  type: GET_USER,
  payload: user,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const userFetchError = (error) => ({
  type: USER_FETCH_ERROR,
  payload: error,
});

export const userLoading = () => ({
  type: USER_LOADING,
});

export const userLoadingEnd = () => ({
  type: USER_LOADING_END,
});

export const userModalOpen = () => ({
  type: USER_MODAL_OPEN,
});

export const userModalClose = () => ({
  type: USER_MODAL_CLOSE,
});

export const deleteModalOpen = () => ({
  type: DELETE_MODAL_OPEN,
});

export const deleteModalClose = () => ({
  type: DELETE_MODAL_CLOSE,
});

export const uploadAvatar = (images) => ({
  type: UPLOAD_AVATAR,
  payload: images,
});

export const fetchRegisterUser = (user) => async (dispatch) => {
  dispatch(userLoading());
  try {
    const response = await axios.post(`${url}/profile/register`, user);
    const data = await response.data;
    return [
      dispatch(registerUser(data.user)),
      dispatch(userLoadingEnd()),
      dispatch(setToken(data.token)),
      localStorage.setItem('token', JSON.stringify(data.token)),
      localStorage.setItem('user', JSON.stringify(data.user)),
      dispatch(push('/')),
      toaster.notify(
        () => (
          <NotificationComponent
            success={true}
            text={`Welcome! Enjoy your time`}
          />
        ),
        { duration: 1500 }
      ),
    ];
  } catch (error) {
    return [
      dispatch(userFetchError(error)),
      dispatch(userLoadingEnd()),
      toaster.notify(
        () => (
          <NotificationComponent
            text={'Oops! Something went wrong!'}
            success={false}
          />
        ),
        { duration: 1500 }
      ),
    ];
  }
};

export const fetchLogoutUser = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const path = window.location.pathname;

  try {
    await axios.post(`${url}/profile/logout`, null, config);

    return [
      path.includes('profile') && dispatch(push('/home')),
      dispatch(logOutUser()),
      toaster.notify(
        () => <NotificationComponent text={'Buh-Bye!'} success={true} />,
        { duration: 1500 }
      ),
    ];
  } catch (error) {
    return dispatch(userFetchError(error));
  }
};

export const fetchLoginUser = (user) => async (dispatch) => {
  dispatch(userLoading());
  try {
    const response = await axios.post(`${url}/profile/login`, user);
    const data = await response.data;
    return [
      dispatch(loginUser(data.user)),
      dispatch(userLoadingEnd()),
      dispatch(setToken(data.token)),
      localStorage.setItem('token', JSON.stringify(data.token)),
      localStorage.setItem('user', JSON.stringify(data.user)),
      dispatch(push('/home')),
      toaster.notify(
        () => (
          <NotificationComponent
            success={true}
            text={`Welcome! Enjoy your time`}
          />
        ),
        { duration: 1500 }
      ),
    ];
  } catch (error) {
    return [
      dispatch(userFetchError(error)),
      dispatch(userLoadingEnd()),
      toaster.notify(
        () => (
          <NotificationComponent
            text={'Oops! Something went wrong!'}
            success={false}
          />
        ),
        { duration: 1500 }
      ),
    ];
  }
};

// To get the user,
// but because I added an or statement in user and token initial states,
// app will check if there is user and token in localStorage
// so there will be no need for this.
// Adding just in case.
export const fetchUser = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  dispatch(userLoading());
  try {
    const response = await axios.get(`${url}/profile`, config);
    const data = await response.data;
    return [
      dispatch(registerUser(data.user)),
      dispatch(userLoadingEnd()),
      dispatch(setToken(data.token)),
      localStorage.setItem('token', JSON.stringify(data.token)),
      localStorage.setItem('user', JSON.stringify(data.user)),
    ];
  } catch (error) {
    return [dispatch(userFetchError(error)), dispatch(userLoadingEnd())];
  }
};

export const fetchUpdateUser = (user) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.patch(`${url}/profile`, user, config);
    const data = await response.data;
    return [
      dispatch(updateUser(data)),
      localStorage.setItem('user', JSON.stringify(data)),
      dispatch(push('/')),
      toaster.notify(
        () => (
          <NotificationComponent
            success={true}
            text={`Updated successfully!`}
          />
        ),
        { duration: 1500 }
      ),
    ];
  } catch (error) {
    return [
      dispatch(userFetchError(error)),
      toaster.notify(
        () => (
          <NotificationComponent
            text={'Oops! Something went wrong!'}
            success={false}
          />
        ),
        { duration: 1500 }
      ),
    ];
  }
};

export const fetchDeleteUser = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    await axios.delete(`${url}/profile`, config);
    return [
      localStorage.clear(),
      dispatch(push('/')),
      dispatch(deleteUser()),
      toaster.notify(
        () => <NotificationComponent success={true} text={`Buh-bye!`} />,
        { duration: 1500 }
      ),
    ];
  } catch (error) {
    return [
      dispatch(userFetchError(error)),
      toaster.notify(
        () => (
          <NotificationComponent
            success={false}
            text={`Something went wrong!`}
          />
        ),
        { duration: 1500 }
      ),
    ];
  }
};

export const fetchUploadAvatar = (input) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.post(`${url}/profile/avatar`, input, config);
    const data = await response.data;
    return [
      dispatch(uploadAvatar(data)),
      localStorage.setItem('user', JSON.stringify(data)),
      toaster.notify(
        () => (
          <NotificationComponent
            text={'Avatar is changed! Wow, that looks amazing! ;)'}
            success={true}
          />
        ),
        { duration: 1500 }
      ),
    ];
  } catch (error) {
    return [
      dispatch(userFetchError(error)),
      toaster.notify(
        () => (
          <NotificationComponent
            text={'Oops! Something went wrong!'}
            success={false}
          />
        ),
        { duration: 1500 }
      ),
    ];
  }
};
