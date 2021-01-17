import React from "react";
import { mount, shallow } from "enzyme";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import Chart from "components/chart/Chart";
import { chartData } from "tests/fixtures/chart";

describe("Testing Chart component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    // given empty array,
    // component renders svg
    // but when given chartData, d3 gives error
    store = mockStore({
      chartData: [],
      width: 700,
    });

    jest.spyOn(React, "useEffect").mockImplementation((f) => f());

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    wrapper = mount(<Chart store={store} />);
  });

  test("Should render the component", () => {
    expect(wrapper).toHaveLength(1);
    const html = wrapper.find("svg").html();
    expect(html).toBeTruthy();
  });
});
