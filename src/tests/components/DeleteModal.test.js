import React, { useState as useStateMock } from "react";
import { shallow } from "enzyme";
import moxios from "moxios";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import {
  DELETE_MODAL_CLOSE,
  DELETE_USER,
  fetchDeleteUser,
} from "redux/actions/user";

import DeleteModal from "components/delete-modal/DeleteModal";

describe("Testing DeleteModal", () => {
  let wrapper;
  let store;
  let setState;
  let useStateMock;
  let reactMock;

  jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn(),
  }));

  beforeEach(() => {
    store = mockStore({});

    setState = jest.fn();
    useStateMock = (initState = global.scrollY) => [initState, setState];

    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    jest.spyOn(React, "useEffect").mockImplementation((f) => f());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    moxios.install();

    wrapper = shallow(<DeleteModal store={store} />);
  });

  afterEach(() => {
    moxios.uninstall();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test("Should render the component", () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find("button").first().text()).toEqual("Cancel");
  });
  test("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Should close modal on modal click", () => {
    wrapper.simulate("click");

    const actions = store.getActions();
    expect(actions).toEqual([{ type: DELETE_MODAL_CLOSE }]);
  });
  test("Should close modal on cancel button click", () => {
    wrapper.find("button").first().simulate("click");

    const actions = store.getActions();
    expect(actions).toEqual([{ type: DELETE_MODAL_CLOSE }]);
  });
  test("Should delete user on delete button click", async () => {
    wrapper.find("button").last().simulate("click");

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
      });
    });

    await store.dispatch(fetchDeleteUser());

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: DELETE_MODAL_CLOSE },
      {
        type: "@@router/CALL_HISTORY_METHOD",
        payload: { method: "push", args: ["/"] },
      },
      { type: DELETE_USER },
    ]);
  });
  test("Should set scroll value", () => {
    global.scrollY = 1000;

    global.dispatchEvent(new Event("scroll"));

    // First one gets called in useEffect
    expect(setState).toHaveBeenCalledTimes(1);

    // Second one is for useEffect return
    global.removeEventListener(new Event("scroll"), setState(global.scrollY));

    expect(setState).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenCalledWith(global.scrollY);
  });
});
