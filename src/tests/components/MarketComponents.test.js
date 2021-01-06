import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { mount, shallow } from "enzyme";

import * as ReactReduxHooks from "../../utils/react-redux-hooks";
import { mockStore } from "../store";

import MarketComponents from "../../components/market-components/MarketComponents";
import { MarketMenu } from "../../components/market-components/MarketComponents.styles";
import { forex, homeChartData } from "../fixtures/chart";

// Mocking the fetch functions
// To be able to mock useEffect
// jest.mock("../../redux/actions/chart.js", () => {
//   return {
//     fetchHomeChart: () => jest.fn(),
//     fetchForex: () => jest.fn(),
//     changeMarketType: () => jest.fn(),
//     changeMarketName: () => jest.fn(),
//   };
// });

describe("Testing MarketComponents component", () => {
  let store;
  let wrapper;

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
    // For MarketCards component to render normally,
    // I had to add forex state
    beforeEach(() => {
      store = mockStore({
        marketName: "Commodities",
        forex,
        homeChartData,
      });

      /*  Market menu uses styled component props
          Checking if name of the menu equals to marketName
          So for that, I am adding marketName to store and active props to
          component to be able to mock it.
          ********
          Also, because I need to click the market menu to fetch market types
          and for that I need to use mount; and therefore I am wrapping the 
          components with Router. Otherwise it gives me error
      */
      wrapper = mount(
        <Router>
          <MarketComponents store={store}>
            <MarketMenu active="Commodities" />
          </MarketComponents>
        </Router>
      );

      wrapper.find("button").last().simulate("click");
    });

    afterEach(() => {
      jest.clearAllMocks();
      store.clearActions();
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
      //   taking a snapshot here because menu should have an active class
      expect(wrapper).toMatchSnapshot();
    });
  });
});
