import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import moxios from "moxios";
import { mount, shallow } from "enzyme";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import MarketComponents from "components/market-components/MarketComponents";
import { MarketMenu } from "components/market-components/MarketComponents.styles";
import {
  chartData,
  forex,
  forexLengthTwo,
  homeChartData,
  marketType,
} from "tests/fixtures/chart";
import {
  CLEAN_STATE,
  fetchForex,
  fetchHomeChart,
  FETCH_FOREX_SUCCESS,
  SET_LOADING_TRUE,
} from "redux/actions/chart";

describe("Testing MarketComponents component", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    jest.spyOn(React, "useEffect").mockImplementation((f) => f());

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    jest.clearAllMocks();
    jest.resetAllMocks();
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
        marketType,
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
    });

    afterEach(() => {
      jest.clearAllMocks();
      store.clearActions();
    });

    test("Should be change the market type and name on click", () => {
      wrapper.find("button").last().simulate("click");
      const actions = store.getActions();
      expect(actions).toEqual([
        { type: CLEAN_STATE },
        { type: SET_LOADING_TRUE },
        {
          type: "CHANGE_MARKET_TYPE",
          payload: "ZGUSD,CLUSD,HGUSD,SIUSD,PLUSD,BZUSD",
        },
        { type: "CHANGE_MARKET_NAME", payload: "Commodities" },
      ]);
      //   taking a snapshot here because menu should have an active class
      expect(wrapper).toMatchSnapshot();
    });
    test("Should fetch the forex data", async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: forexLengthTwo.data,
        });
      });

      const expectedActions = [
        { type: CLEAN_STATE },
        { type: SET_LOADING_TRUE },
        { type: FETCH_FOREX_SUCCESS, payload: forexLengthTwo.data },
      ];

      await store.dispatch(fetchForex(marketType));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
