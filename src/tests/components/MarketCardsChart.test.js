import React from "react";
import { shallow } from "enzyme";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import MarketCardsChart from "components/market-cards-chart/MarketCardsChart";

describe("Testing Chart component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore({
      homeChartData: [],
    });

    jest.spyOn(React, "useEffect").mockImplementation((f) => f());

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    wrapper = shallow(<MarketCardsChart store={store} />);
  });

  test("Should render the component", () => {
    expect(wrapper).toHaveLength(1);
    const html = wrapper.find("svg").html();
    expect(html).toBeTruthy();
  });
});
