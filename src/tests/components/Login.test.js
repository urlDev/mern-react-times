import React from "react";
import { shallow } from "enzyme";
import moxios from "moxios";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import { data, userInputLogin } from "tests/fixtures/user";
import {
  fetchLoginUser,
  LOGIN_USER,
  SET_TOKEN,
  USER_LOADING,
  USER_LOADING_END,
} from "redux/actions/user";

import Login from "components/login/Login";

describe("Testing Login component", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({});

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = shallow(<Login store={store} />);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test("Should render the component", () => {
    expect(wrapper).toHaveLength(1);
  });
  test("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Should change the inputs value", () => {
    const value = "Can";
    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value, name: "email" } });

    expect(wrapper.find("input").first().prop("value")).toEqual(value);
  });
  test("Should submit the form", async () => {
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: data,
      });
    });

    await store.dispatch(fetchLoginUser(userInputLogin));

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: USER_LOADING },
      { type: USER_LOADING },
      {
        type: LOGIN_USER,
        payload: data.user,
      },
      { type: USER_LOADING_END },
      { type: SET_TOKEN, payload: data.token },
      {
        type: "@@router/CALL_HISTORY_METHOD",
        payload: { method: "push", args: ["/home"] },
      },
    ]);
  });
  test("Testing Login button", () => {
    // Register prop is false, button shows Login
    expect(wrapper.find("button").text()).toEqual("Login");

    wrapper = shallow(<Login store={store} register={true} />);
    // Register props is true, button shows Register
    expect(wrapper.find("button").text()).toEqual("Register");
  });
});
