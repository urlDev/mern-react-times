import moxios from "moxios";

import {
  REGISTER_USER,
  LOGOUT_USER,
  LOGIN_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_USER,
  SET_TOKEN,
  USER_FETCH_ERROR,
  USER_LOADING,
  USER_LOADING_END,
  USER_MODAL_OPEN,
  USER_MODAL_CLOSE,
  DELETE_MODAL_CLOSE,
  DELETE_MODAL_OPEN,
  registerUser,
  logOutUser,
  loginUser,
  deleteUser,
  updateUser,
  getUser,
  setToken,
  userFetchError,
  userLoading,
  userLoadingEnd,
  userModalOpen,
  userModalClose,
  deleteModalOpen,
  deleteModalClose,
  fetchRegisterUser,
  fetchLogoutUser,
  fetchLoginUser,
  fetchUser,
  fetchUpdateUser,
  fetchDeleteUser,
} from "../../../redux/actions/user";

import { user, token, errorUser } from "../../fixtures/user";

// eslint-disable-next-line jest/no-mocks-import
import { store } from "../../__mocks__/store";

test("Should register user", () => {
  const action = registerUser(user);

  expect(action).toEqual({
    type: REGISTER_USER,
    payload: user,
  });
});

test("Should logout user", () => {
  const action = logOutUser();

  expect(action).toEqual({
    type: LOGOUT_USER,
  });
});

test("Should login user", () => {
  const action = loginUser(user);

  expect(action).toEqual({
    type: LOGIN_USER,
    payload: user,
  });
});

test("Should delete user", () => {
  const action = deleteUser();

  expect(action).toEqual({
    type: DELETE_USER,
  });
});

test("Should update user", () => {
  const action = updateUser(user);

  expect(action).toEqual({
    type: UPDATE_USER,
    payload: user,
  });
});

test("Should get user", () => {
  const action = getUser(user);

  expect(action).toEqual({
    type: GET_USER,
    payload: user,
  });
});

test("Should set token", () => {
  const action = setToken(token);

  expect(action).toEqual({
    type: SET_TOKEN,
    payload: token,
  });
});

test("Should show error if user cant be fetched", () => {
  const action = userFetchError(errorUser);

  expect(action).toEqual({
    type: USER_FETCH_ERROR,
    payload: errorUser,
  });
});

test("Should set the user loading state to true", () => {
  const action = userLoading();

  expect(action).toEqual({
    type: USER_LOADING,
  });
});

test("Should set the user loading state to false", () => {
  const action = userLoadingEnd();

  expect(action).toEqual({
    type: USER_LOADING_END,
  });
});

test("Should open user modal", () => {
  const action = userModalOpen();

  expect(action).toEqual({
    type: USER_MODAL_OPEN,
  });
});

test("Should close user modal", () => {
  const action = userModalClose();

  expect(action).toEqual({
    type: USER_MODAL_CLOSE,
  });
});

test("Should open delete modal", () => {
  const action = deleteModalOpen();

  expect(action).toEqual({
    type: DELETE_MODAL_OPEN,
  });
});

test("Should close delete modal", () => {
  const action = deleteModalClose();

  expect(action).toEqual({
    type: DELETE_MODAL_CLOSE,
  });
});
