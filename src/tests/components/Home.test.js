import React from "react";
import { shallow } from "enzyme";
import moxios from "moxios";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import {
  CHANGE_HEADER,
  fetchTopStories,
  FETCH_STORY_SUCCESS,
} from "redux/actions/news";
import { story } from "tests/fixtures/news";

import Home from "components/home/Home";
import MarketComponents from "components/market-components/MarketComponents";
import Loading from "components/loading/Loading";
import ErrorFallback from "components/error-fallback/ErrorFallback";

describe("Testing Home component", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    window.history.pushState({}, "", "/arts");

    jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());

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
  });

  describe("Testing component with MarketComponents", () => {
    beforeEach(() => {
      store = mockStore({
        loadingNews: false,
        errorChart: false,
        popular: [],
        header: "Home",
      });

      wrapper = shallow(<Home store={store} />);
    });

    test("Should render the component with MarketComponents", () => {
      expect(wrapper).toHaveLength(1);
      expect(
        wrapper.containsMatchingElement(<MarketComponents />)
      ).toBeTruthy();
    });
    test("Should match the snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
    test("Should dispatch actions in useEffect", async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: story,
        });
      });

      await store.dispatch(fetchTopStories("Arts"));

      const actions = store.getActions();
      expect(actions).toEqual([
        { type: CHANGE_HEADER, payload: "arts" },
        {
          type: FETCH_STORY_SUCCESS,
          payload: story.results,
        },
      ]);
    });
  });
  describe("Testing the component Error and Loading", () => {
    beforeEach(() => {
      store = mockStore({
        loadingNews: true,
        popular: [],
        errorChart: true,
        header: "Home",
      });

      wrapper = shallow(<Home store={store} />);
    });

    test("Should render error and loading components", () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.containsMatchingElement(<Loading />)).toBeTruthy();
      expect(wrapper.containsMatchingElement(<ErrorFallback />)).toBeTruthy();
    });
    test("Should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
