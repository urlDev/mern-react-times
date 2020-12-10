import axios from 'axios';

const url = 'https://urldev-mern-react-times-api.herokuapp.com';

export const REGISTER_USER = 'REGISTER_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const USER_FETCH_ERROR = 'USER_FETCH_ERROR';
export const USER_LOADING = 'USER_LOADING';
export const USER_LOADING_END = 'USER_LOADING_END';

export const registerUser = (user) => ({
    type: REGISTER_USER,
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