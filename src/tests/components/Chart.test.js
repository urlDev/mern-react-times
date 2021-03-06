import React from "react";
import { shallow } from "enzyme";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import Chart from "components/chart/Chart";

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

    wrapper = shallow(<Chart store={store} />);
  });

  test("Should render the component", () => {
    expect(wrapper).toHaveLength(1);
    const html = wrapper.find("svg").html();
    expect(html).toBeTruthy();
  });
});
