import userReducer from "../../../redux/reducers/user";

import * as UserActions from "redux/actions/user";

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
  const state = userReducer(undefined, {});

  expect(state).toEqual({
    loadingUser: false,
    errorUser: null,
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: JSON.parse(localStorage.getItem("token")) || {},
    userModal: false,
    deleteModal: false,
  });
});

test("Should register user successfully", () => {
  const state = userReducer(initialState, {
    type: UserActions.REGISTER_USER,
    payload: user,
  });

  expect(state).toEqual({
    ...initialState,
    user,
  });
});

test("Should login user successfully", () => {
  const state = userReducer(initialState, {
    type: UserActions.LOGIN_USER,
    payload: user,
  });

  expect(state).toEqual({
    ...initialState,
    user,
  });
});

test("Should logout user successfully", () => {
  const state = userReducer(initialState, { type: UserActions.LOGOUT_USER });

  expect(state).toEqual({
    ...initialState,
    user: {},
    token: {},
  });
});

test("Should update user successfully", () => {
  const state = userReducer(initialState, {
    type: UserActions.UPDATE_USER,
    payload: user,
  });

  expect(state).toEqual({
    ...initialState,
    user,
  });
});

test("Should delete user and token successfully", () => {
  const state = userReducer(initialState, { type: UserActions.DELETE_USER });

  expect(state).toEqual({
    ...initialState,
    user: {},
    token: {},
  });
});

test("Should set the token", () => {
  const state = userReducer(initialState, {
    type: UserActions.SET_TOKEN,
    payload: token,
  });

  expect(state).toEqual({
    ...initialState,
    token,
  });
});

test("Should save error to state if there is any", () => {
  const state = userReducer(initialState, {
    type: UserActions.USER_FETCH_ERROR,
    payload: errorUser,
  });

  expect(state).toEqual({
    ...initialState,
    error: errorUser,
  });
});

test("Should set the user loading state to true", () => {
  const state = userReducer(initialState, { type: UserActions.USER_LOADING });

  expect(state).toEqual({
    ...initialState,
    loadingUser: true,
  });
});

test("Should set the user loading state to false", () => {
  const state = userReducer(initialState, {
    type: UserActions.USER_LOADING_END,
  });

  expect(state).toEqual({
    ...initialState,
    loadingUser: false,
  });
});

test("Should open the user modal", () => {
  const state = userReducer(initialState, {
    type: UserActions.USER_MODAL_OPEN,
  });

  expect(state).toEqual({
    ...initialState,
    userModal: true,
  });
});

test("Should close the user modal", () => {
  const state = userReducer(initialState, {
    type: UserActions.USER_MODAL_CLOSE,
  });

  expect(state).toEqual({
    ...initialState,
    userModal: false,
  });
});

test("Should open delete modal", () => {
  const state = userReducer(initialState, {
    type: UserActions.DELETE_MODAL_OPEN,
  });

  expect(state).toEqual({
    ...initialState,
    deleteModal: true,
  });
});

test("Should close delete modal", () => {
  const state = userReducer(initialState, {
    type: UserActions.DELETE_MODAL_CLOSE,
  });

  expect(state).toEqual({
    ...initialState,
    deleteModal: false,
  });
});

test("Should upload user", () => {
  const state = userReducer(initialState, {
    type: UserActions.UPLOAD_AVATAR,
    payload: user,
  });

  expect(state).toEqual({
    ...initialState,
    user,
  });
});
