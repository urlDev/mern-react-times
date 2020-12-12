import axios from 'axios';

const url = 'https://urldev-mern-react-times-api.herokuapp.com';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const GET_USER = 'GET_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const USER_FETCH_ERROR = 'USER_FETCH_ERROR';
export const USER_LOADING = 'USER_LOADING';
export const USER_LOADING_END = 'USER_LOADING_END';

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

export const fetchRegisterUser = (user) => async(dispatch) => {
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
        ];
    } catch (error) {
        return dispatch(userFetchError(error));
    }
};

export const fetchLogoutUser = () => async(dispatch) => {
    const token = JSON.parse(localStorage.getItem('token'));

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    try {
        await axios.post(`${url}/profile/logout`, null, config);
        dispatch(logOutUser());
        localStorage.clear();
    } catch (error) {
        return dispatch(userFetchError(error));
    }
};

export const fetchLoginUser = (user) => async(dispatch) => {
    try {
        const response = await axios.post(`${url}/profile/login`, user);
        const data = await response.data;
        return [
            dispatch(loginUser(data.user)),
            dispatch(userLoadingEnd()),
            dispatch(setToken(data.token)),
            localStorage.setItem('token', JSON.stringify(data.token)),
            localStorage.setItem('user', JSON.stringify(data.user)),
        ];
    } catch (error) {
        return dispatch(userFetchError(error));
    }
};

// To get the user,
// but because I added an or statement in user and token initial states,
// app will check if there is user and token in localStorage
// so there will be no need for this.
// Adding just in case.
export const fetchUser = () => async(dispatch) => {
    const token = JSON.parse(localStorage.getItem('token'));

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

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
        return dispatch(userFetchError(error));
    }
};