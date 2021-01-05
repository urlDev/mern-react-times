import React from "react";
import { mount, shallow } from "enzyme";

import * as ReactReduxHooks from "../../utils/react-redux-hooks";
import { mockStore } from "../store";
import { fetchHomeChart, fetchForex } from "../../redux/actions/chart";

import MarketComponents from "../../components/market-components/MarketComponents";
import { MarketMenu } from "../../components/market-components/MarketComponents.styles";
import { forexLengthTwo, homeChartData } from "../fixtures/chart";
import HomeMarketCards from "../../components/home-market-cards/HomeMarketCards";

// Mocking the fetch functions
// To be able to mock useEffect
// jest.mock("../../redux/actions/chart.js", () => {
//   return {
//     fetchHomeChart: () => jest.fn(),
//     fetchForex: () => jest.fn(),
//   };
// });

describe("Testing MarketComponents component", () => {
  let store;
  let wrapper;
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  beforeEach(() => {
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);
  });

  describe("Testing component without loading component", () => {
    beforeEach(() => {
      store = mockStore({});

      wrapper = shallow(<MarketComponents store={store} />);
    });

    test("Should render the component successfully", () => {
      expect(wrapper).toHaveLength(1);
    });

    test("Should match the snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Testing component with loading component", () => {
    beforeEach(() => {
      store = mockStore({
        loadingChart: true,
      });

      wrapper = shallow(<MarketComponents store={store} />);
    });

    afterEach(() => {
      wrapper.update();
    });

    test("Should render the component successfully", () => {
      expect(wrapper).toHaveLength(1);
    });
    test("Should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
    test("Should get the chart state", () => {
      const state = store.getState();

      expect(state).toEqual({ loadingChart: true });
    });
  });

  describe("Testing component for when user clicks a menu and useEffect", () => {
    beforeEach(() => {
      store = mockStore({
        marketName: "Commodities",
      });

      useEffect = jest.spyOn(React, "useEffect");
      mockUseEffect();

      wrapper = mount(
        <MarketComponents store={store}>
          <MarketMenu active="Commodities" />
        </MarketComponents>
      );

      wrapper.find("button").last().simulate("click");
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("Should be change the market type and name on click", () => {
      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: "CHANGE_MARKET_TYPE",
          payload: "ZGUSD,CLUSD,HGUSD,SIUSD,PLUSD,BZUSD",
        },
        { type: "CHANGE_MARKET_NAME", payload: "Commodities" },
      ]);
    });

    test("Should load the charts data after button is clicked", () => {});
  });
});
