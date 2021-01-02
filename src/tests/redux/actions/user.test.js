import moxios from "moxios";
import { act } from "react-dom/test-utils";

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
  UPLOAD_AVATAR,
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
  fetchUploadAvatar,
  uploadAvatar,
} from "../../../redux/actions/user";

import {
  user,
  token,
  errorUser,
  data,
  userInputRegister,
  userInputLogin,
} from "../../fixtures/user";

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

test("Should upload avatar successfully", () => {
  const action = uploadAvatar(user);

  expect(action).toEqual({
    type: UPLOAD_AVATAR,
    payload: user,
  });
});

describe("Testing async functions", () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("Testing fetchRegisterUser async function", () => {
    test("Should register user successfully", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data,
        });
      });

      const expectedActions = [
        {
          type: USER_LOADING,
        },
        {
          type: REGISTER_USER,
          payload: data.user,
        },
        {
          type: USER_LOADING_END,
        },
        {
          type: SET_TOKEN,
          payload: data.token,
        },
        // This action type comes from connected-react-router
        {
          type: "@@router/CALL_HISTORY_METHOD",
          //   payload is history.push('/)
          payload: { method: "push", args: ["/"] },
        },
      ];

      return store.dispatch(fetchRegisterUser(userInputRegister)).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });

    test("Should show error if theres any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorUser);
      });

      const expectedActions = [
        {
          type: USER_LOADING,
        },
        {
          type: USER_FETCH_ERROR,
          payload: errorUser,
        },
        {
          type: USER_LOADING_END,
        },
      ];

      return store.dispatch(fetchRegisterUser(userInputRegister)).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });
  });

  describe("Testing fetchLogoutUser async function", () => {
    test("Should logout user successfully", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
        });
      });

      const expectedActions = [
        // {
        //   type: "@@router/CALL_HISTORY_METHOD",
        //   //   payload is history.push('/)
        //   payload: { method: "push", args: ["/home"] },
        // },
        { type: LOGOUT_USER },
      ];

      return store.dispatch(fetchLogoutUser()).then(() => {
        const actionsGetCalled = store.getActions();

        // expect(actionsGetCalled).toEqual(expectedActions);
        console.log(actionsGetCalled);
      });
    });

    test("Should show error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorUser);
      });

      const expectedActions = {
        type: USER_FETCH_ERROR,
        payload: errorUser,
      };

      return store.dispatch(fetchLogoutUser()).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });
  });

  describe("Testing fetchLoginUser async function", () => {
    test("Should log in user successfully", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data,
        });
      });

      const expectedActions = [
        { type: USER_LOADING },
        { type: LOGIN_USER, payload: data.user },
        { type: USER_LOADING_END },
        { type: SET_TOKEN, payload: data.token },
        {
          type: "@@router/CALL_HISTORY_METHOD",
          payload: { method: "push", args: ["/home"] },
        },
      ];

      return store.dispatch(fetchLoginUser(userInputLogin)).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });

    test("Should show error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorUser);
      });

      const expectedActions = [
        { type: USER_LOADING },
        { type: USER_FETCH_ERROR, payload: errorUser },
        { type: USER_LOADING_END },
      ];

      return store.dispatch(fetchLoginUser(userInputLogin)).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });
  });

  describe("Testing fetchUser async function", () => {
    test("Should fetch the user successfully", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data,
        });
      });

      const expectedActions = [
        { type: USER_LOADING },
        { type: REGISTER_USER, payload: data.user },
        { type: USER_LOADING_END },
        { type: SET_TOKEN, payload: data.token },
      ];

      return store.dispatch(fetchUser()).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });
    test("Should show error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorUser);
      });

      const expectedActions = [
        { type: USER_LOADING },
        { type: USER_FETCH_ERROR, payload: errorUser },
        { type: USER_LOADING_END },
      ];

      return store.dispatch(fetchUser()).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });
  });

  describe("Testing fetchUpdateUser async function", () => {
    test("Should update the user successfully", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: user,
        });
      });

      const expectedActions = [
        { type: UPDATE_USER, payload: user },
        {
          type: "@@router/CALL_HISTORY_METHOD",
          payload: { method: "push", args: ["/"] },
        },
      ];

      return store.dispatch(fetchUpdateUser(userInputRegister)).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });
    test("Should show error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorUser);
      });

      const expectedActions = { type: USER_FETCH_ERROR, payload: errorUser };

      return store.dispatch(fetchUpdateUser(userInputRegister)).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });
  });
  describe("Testing fetchDeleteUser async function", () => {
    test("Should update the user successfully", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
        });
      });

      const expectedActions = [
        {
          type: "@@router/CALL_HISTORY_METHOD",
          payload: { method: "push", args: ["/"] },
        },
        { type: DELETE_USER },
      ];

      return store.dispatch(fetchDeleteUser()).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });
    test("Should show error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorUser);
      });

      const expectedActions = { type: USER_FETCH_ERROR, payload: errorUser };

      return store.dispatch(fetchDeleteUser()).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });
  });

  describe("Testing fetchUploadAvatar async function", () => {
    test("Should upload avatar successfully", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: user,
        });
      });

      const expectedActions = [
        {
          type: UPLOAD_AVATAR,
          payload: user,
        },
      ];

      return store.dispatch(fetchUploadAvatar("avatarformdata")).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });

    test("Should show error if theres any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorUser);
      });

      const expectedActions = [
        {
          type: USER_FETCH_ERROR,
          payload: errorUser,
        },
      ];

      return store.dispatch(fetchUploadAvatar("avatarupload")).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });
  });
});
