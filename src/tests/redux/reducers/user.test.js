import userReducer from "../../../redux/reducers/user";

import {
  REGISTER_USER,
  LOGOUT_USER,
  LOGIN_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_TOKEN,
  USER_FETCH_ERROR,
  USER_LOADING,
  USER_LOADING_END,
  USER_MODAL_OPEN,
  USER_MODAL_CLOSE,
  DELETE_MODAL_OPEN,
  DELETE_MODAL_CLOSE,
  UPLOAD_AVATAR,
} from "../../../redux/actions/user";

import { user, token, errorUser } from "../../fixtures/user";

const initialState = {
  loadingUser: false,
  errorUser: null,
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: JSON.parse(localStorage.getItem("token")) || {},
  userModal: false,
  deleteModal: false,
};

test("Should set the initial state", () => {
  const state = userReducer(initialState, { type: "@INIT" });

  expect(state).toEqual(initialState);
});

test("Should register user successfully", () => {
  const state = userReducer(initialState, {
    type: REGISTER_USER,
    payload: user,
  });

  expect(state).toEqual({
    ...initialState,
    user,
  });
});

test("Should login user successfully", () => {
  const state = userReducer(initialState, { type: LOGIN_USER, payload: user });

  expect(state).toEqual({
    ...initialState,
    user,
  });
});

test("Should logout user successfully", () => {
  const state = userReducer(initialState, { type: LOGOUT_USER });

  expect(state).toEqual({
    ...initialState,
    user: {},
    token: {},
  });
});

test("Should update user successfully", () => {
  const state = userReducer(initialState, { type: UPDATE_USER, payload: user });

  expect(state).toEqual({
    ...initialState,
    user,
  });
});

test("Should delete user and token successfully", () => {
  const state = userReducer(initialState, { type: DELETE_USER });

  expect(state).toEqual({
    ...initialState,
    user: {},
    token: {},
  });
});

test("Should set the token", () => {
  const state = userReducer(initialState, { type: SET_TOKEN, payload: token });

  expect(state).toEqual({
    ...initialState,
    token,
  });
});

test("Should save error to state if there is any", () => {
  const state = userReducer(initialState, {
    type: USER_FETCH_ERROR,
    payload: errorUser,
  });

  expect(state).toEqual({
    ...initialState,
    error: errorUser,
  });
});

test("Should set the user loading state to true", () => {
  const state = userReducer(initialState, { type: USER_LOADING });

  expect(state).toEqual({
    ...initialState,
    loadingUser: true,
  });
});

test("Should set the user loading state to false", () => {
  const state = userReducer(initialState, { type: USER_LOADING_END });

  expect(state).toEqual({
    ...initialState,
    loadingUser: false,
  });
});

test("Should open the user modal", () => {
  const state = userReducer(initialState, { type: USER_MODAL_OPEN });

  expect(state).toEqual({
    ...initialState,
    userModal: true,
  });
});

test("Should close the user modal", () => {
  const state = userReducer(initialState, { type: USER_MODAL_CLOSE });

  expect(state).toEqual({
    ...initialState,
    userModal: false,
  });
});

test("Should open delete modal", () => {
  const state = userReducer(initialState, { type: DELETE_MODAL_OPEN });

  expect(state).toEqual({
    ...initialState,
    deleteModal: true,
  });
});

test("Should close delete modal", () => {
  const state = userReducer(initialState, { type: DELETE_MODAL_CLOSE });

  expect(state).toEqual({
    ...initialState,
    deleteModal: false,
  });
});

test("Should upload user", () => {
  const state = userReducer(initialState, {
    type: UPLOAD_AVATAR,
    payload: user,
  });

  expect(state).toEqual({
    ...initialState,
    user,
  });
});
