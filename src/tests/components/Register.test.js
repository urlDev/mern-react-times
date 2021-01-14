import React from "react";
import { shallow } from "enzyme";
import moxios from "moxios";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";
import Register from "components/register/Register";
import { data, userInputRegister } from "tests/fixtures/user";
import {
  fetchRegisterUser,
  REGISTER_USER,
  SET_TOKEN,
  USER_LOADING,
  USER_LOADING_END,
} from "redux/actions/user";

describe("Testing Register component", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({});

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    wrapper = shallow(<Register store={store} />);

    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test("Should render component", () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find("button").text()).toEqual("Register");
  });
  test("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Should change the input value", () => {
    const value = "Can";

    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value, name: "name" } });

    expect(wrapper.find("input").first().prop("value")).toEqual(value);
  });
  test("Should submit the form when user registers", async () => {
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: data,
      });
    });

    const expectedActions = [
      { type: USER_LOADING },
      { type: USER_LOADING },
      {
        type: REGISTER_USER,
        payload: data.user,
      },
      { type: USER_LOADING_END },
      { type: SET_TOKEN, payload: data.token },
      {
        type: "@@router/CALL_HISTORY_METHOD",
        payload: { method: "push", args: ["/"] },
      },
    ];

    await store.dispatch(fetchRegisterUser(userInputRegister));

    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });
});
