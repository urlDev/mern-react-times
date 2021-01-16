import React from "react";
import { shallow } from "enzyme";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";
import { setWidth, SET_WIDTH } from "redux/actions/news";

import App from "App";

describe("Testing App component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore({});

    // Spying on useEffect.
    // Making it run once to prevent loop
    jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    wrapper = shallow(<App store={store} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test("Should render the component", () => {
    expect(wrapper).toHaveLength(1);
  });
  test("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Should change the inner width", async () => {
    // Change the viewport to 500px.
    global.innerWidth = 500;

    // Trigger the window resize event.
    // Changing window resize makes jest spyOn useEffect
    // so without needing to dispatch the action manually
    // useEffect dispatches it with the payload
    global.dispatchEvent(new Event("resize"));

    const actions = store.getActions();

    expect(actions).toEqual([{ type: SET_WIDTH, payload: 500 }]);
  });
});
