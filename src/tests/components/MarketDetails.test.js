import React from "react";
import { shallow } from "enzyme";
import moxios from "moxios";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import { user } from "tests/fixtures/user";
import { chartData, chartTimeFrame, marketDetail } from "tests/fixtures/chart";
import { favorite, favorites } from "tests/fixtures/favorite";
import Chart from "components/chart/Chart";
import {
  CLEAN_CHART_DATA,
  fetchChartData,
  SET_CHART_DATA,
  SET_CHART_TIME_FRAME,
} from "redux/actions/chart";
import {
  ADD_FAVORITE,
  fetchAddFavorites,
  GET_FAVORITE,
} from "redux/actions/favorite";

import MarketDetails from "components/market-details/MarketDetails";

describe("Testing MarketDetails component", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    // changing mockImplementation from mockImplementationOnce
    // so I can get both useEffects to work
    jest.spyOn(React, "useEffect").mockImplementation((f) => f());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("Testing the component with user", () => {
    beforeEach(() => {
      store = mockStore({
        user,
        marketDetail,
        favorites,
        chartTimeFrame,
      });

      wrapper = shallow(<MarketDetails store={store} />);
    });
    test("Should render the component", () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.containsMatchingElement(<Chart />)).toBeTruthy();
      expect(wrapper.find("img").prop("alt")).toEqual("empty bookmark");
    });
    test("Should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
    test("Should dispatch actions on load", async () => {
      // There are two useEffects, one is for chart the other is for favorites
      // Making two moxios requests here
      // one for chart, the other for favorite
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: chartData,
        });
        const secondRequest = moxios.requests.at(1);
        secondRequest.respondWith({
          status: 200,
          response: favorites,
        });
      });

      const expectedActions = [
        { type: CLEAN_CHART_DATA },
        { type: SET_CHART_DATA, payload: chartData },
        { type: GET_FAVORITE, payload: favorites },
      ];

      // dispatching one action, in useEffect is enough
      // to get all the actions
      await store.dispatch(fetchChartData(marketDetail.symbol, chartTimeFrame));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
    test("Should dispatch add or delete functions on click", async () => {
      wrapper.find("img").parent().simulate("click");

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: favorite,
        });
      });

      const expectedActions = [
        { type: CLEAN_CHART_DATA },
        {
          type: ADD_FAVORITE,
          payload: favorite.symbol[0],
        },
      ];

      await store.dispatch(fetchAddFavorites(marketDetail));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
    test("Should dispatch fetchAddFavorites", async () => {
      // In handleClick function, I am checking the length of favorites array
      // In previous test, I checked for when theres a favorite
      // Now I am checking when its empty and adding for the first time
      store = mockStore({
        user,
        marketDetail,
        favorites: [],
        chartTimeFrame,
      });

      wrapper = shallow(<MarketDetails store={store} />);

      wrapper.find("img").parent().simulate("click");

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: favorite,
        });
      });

      const expectedActions = [
        { type: CLEAN_CHART_DATA },
        {
          type: ADD_FAVORITE,
          payload: favorite.symbol[0],
        },
      ];

      await store.dispatch(fetchAddFavorites(marketDetail));

      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
    test("Should change time frame on click", () => {
      wrapper.childAt(0).childAt(4).simulate("click");

      const actions = store.getActions();
      expect(actions).toEqual([
        { type: CLEAN_CHART_DATA },
        { type: SET_CHART_TIME_FRAME, payload: "1hour" },
      ]);
    });
  });
});
