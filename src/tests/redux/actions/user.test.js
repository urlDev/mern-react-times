import moxios from "moxios";

import * as UserActions from "redux/actions/user";

import {
  user,
  token,
  errorUser,
  data,
  userInputRegister,
  userInputLogin,
} from "../../fixtures/user";

import { store } from "../../store";

test("Should register user", () => {
  const action = UserActions.registerUser(user);

  expect(action).toEqual({
    type: UserActions.REGISTER_USER,
    payload: user,
  });
});

test("Should logout user", () => {
  const action = UserActions.logOutUser();

  expect(action).toEqual({
    type: UserActions.LOGOUT_USER,
  });
});

test("Should login user", () => {
  const action = UserActions.loginUser(user);

  expect(action).toEqual({
    type: UserActions.LOGIN_USER,
    payload: user,
  });
});

test("Should delete user", () => {
  const action = UserActions.deleteUser();

  expect(action).toEqual({
    type: UserActions.DELETE_USER,
  });
});

test("Should update user", () => {
  const action = UserActions.updateUser(user);

  expect(action).toEqual({
    type: UserActions.UPDATE_USER,
    payload: user,
  });
});

test("Should get user", () => {
  const action = UserActions.getUser(user);

  expect(action).toEqual({
    type: UserActions.GET_USER,
    payload: user,
  });
});

test("Should set token", () => {
  const action = UserActions.setToken(token);

  expect(action).toEqual({
    type: UserActions.SET_TOKEN,
    payload: token,
  });
});

test("Should show error if user cant be fetched", () => {
  const action = UserActions.userFetchError(errorUser);

  expect(action).toEqual({
    type: UserActions.USER_FETCH_ERROR,
    payload: errorUser,
  });
});

test("Should set the user loading state to true", () => {
  const action = UserActions.userLoading();

  expect(action).toEqual({
    type: UserActions.USER_LOADING,
  });
});

test("Should set the user loading state to false", () => {
  const action = UserActions.userLoadingEnd();

  expect(action).toEqual({
    type: UserActions.USER_LOADING_END,
  });
});

test("Should open user modal", () => {
  const action = UserActions.userModalOpen();

  expect(action).toEqual({
    type: UserActions.USER_MODAL_OPEN,
  });
});

test("Should close user modal", () => {
  const action = UserActions.userModalClose();

  expect(action).toEqual({
    type: UserActions.USER_MODAL_CLOSE,
  });
});

test("Should open delete modal", () => {
  const action = UserActions.deleteModalOpen();

  expect(action).toEqual({
    type: UserActions.DELETE_MODAL_OPEN,
  });
});

test("Should close delete modal", () => {
  const action = UserActions.deleteModalClose();

  expect(action).toEqual({
    type: UserActions.DELETE_MODAL_CLOSE,
  });
});

test("Should upload avatar successfully", () => {
  const action = UserActions.uploadAvatar(user);

  expect(action).toEqual({
    type: UserActions.UPLOAD_AVATAR,
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
          type: UserActions.USER_LOADING,
        },
        {
          type: UserActions.REGISTER_USER,
          payload: data.user,
        },
        {
          type: UserActions.USER_LOADING_END,
        },
        {
          type: UserActions.SET_TOKEN,
          payload: data.token,
        },
        // This action type comes from connected-react-router
        {
          type: "@@router/CALL_HISTORY_METHOD",
          //   payload is history.push('/)
          payload: { method: "push", args: ["/"] },
        },
      ];

      return store
        .dispatch(UserActions.fetchRegisterUser(userInputRegister))
        .then(() => {
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
          type: UserActions.USER_LOADING,
        },
        {
          type: UserActions.USER_FETCH_ERROR,
          payload: errorUser,
        },
        {
          type: UserActions.USER_LOADING_END,
        },
      ];

      return store
        .dispatch(UserActions.fetchRegisterUser(userInputRegister))
        .then(() => {
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
        { type: UserActions.LOGOUT_USER },
      ];

      return store.dispatch(UserActions.fetchLogoutUser()).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });

    test("Should show error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorUser);
      });

      const expectedActions = {
        type: UserActions.USER_FETCH_ERROR,
        payload: errorUser,
      };

      return store.dispatch(UserActions.fetchLogoutUser()).then(() => {
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
        { type: UserActions.USER_LOADING },
        { type: UserActions.LOGIN_USER, payload: data.user },
        { type: UserActions.USER_LOADING_END },
        { type: UserActions.SET_TOKEN, payload: data.token },
        {
          type: "@@router/CALL_HISTORY_METHOD",
          payload: { method: "push", args: ["/home"] },
        },
      ];

      return store
        .dispatch(UserActions.fetchLoginUser(userInputLogin))
        .then(() => {
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
        { type: UserActions.USER_LOADING },
        { type: UserActions.USER_FETCH_ERROR, payload: errorUser },
        { type: UserActions.USER_LOADING_END },
      ];

      return store
        .dispatch(UserActions.fetchLoginUser(userInputLogin))
        .then(() => {
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
        { type: UserActions.USER_LOADING },
        { type: UserActions.REGISTER_USER, payload: data.user },
        { type: UserActions.USER_LOADING_END },
        { type: UserActions.SET_TOKEN, payload: data.token },
      ];

      return store.dispatch(UserActions.fetchUser()).then(() => {
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
        { type: UserActions.USER_LOADING },
        { type: UserActions.USER_FETCH_ERROR, payload: errorUser },
        { type: UserActions.USER_LOADING_END },
      ];

      return store.dispatch(UserActions.fetchUser()).then(() => {
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
        { type: UserActions.UPDATE_USER, payload: user },
        {
          type: "@@router/CALL_HISTORY_METHOD",
          payload: { method: "push", args: ["/"] },
        },
      ];

      return store
        .dispatch(UserActions.fetchUpdateUser(userInputRegister))
        .then(() => {
          const actionsGetCalled = store.getActions();

          expect(actionsGetCalled).toEqual(expectedActions);
        });
    });
    test("Should show error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorUser);
      });

      const expectedActions = {
        type: UserActions.USER_FETCH_ERROR,
        payload: errorUser,
      };

      return store
        .dispatch(UserActions.fetchUpdateUser(userInputRegister))
        .then(() => {
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
        { type: UserActions.DELETE_USER },
      ];

      return store.dispatch(UserActions.fetchDeleteUser()).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });
    test("Should show error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorUser);
      });

      const expectedActions = {
        type: UserActions.USER_FETCH_ERROR,
        payload: errorUser,
      };

      return store.dispatch(UserActions.fetchDeleteUser()).then(() => {
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
          type: UserActions.UPLOAD_AVATAR,
          payload: user,
        },
      ];

      return store
        .dispatch(UserActions.fetchUploadAvatar("avatarformdata"))
        .then(() => {
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
          type: UserActions.USER_FETCH_ERROR,
          payload: errorUser,
        },
      ];

      return store
        .dispatch(UserActions.fetchUploadAvatar("avatarupload"))
        .then(() => {
          const actionsGetCalled = store.getActions();

          expect(actionsGetCalled).toEqual(expectedActions);
        });
    });
  });
});
