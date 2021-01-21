import React from "react";
import { shallow } from "enzyme";
import moxios from "moxios";
import renderer from "react-test-renderer";
import "jest-styled-components";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import { rating } from "tests/fixtures/chart";
import {
  fetchRating,
  SET_MARKET_DETAIL,
  SET_RATING,
} from "redux/actions/chart";
import { DELETE_FAVORITE, fetchDeleteFavorite } from "redux/actions/favorite";
import { user } from "tests/fixtures/user";
import { favorite, favorites } from "tests/fixtures/favorite";

import UserFavorites from "components/user-favorites/UserFavorites";
import { StockPercentage } from "components/user-favorites/UserFavorites.styles";

describe("Testing UserFavorites component", () => {
  let wrapper;
  let store;

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

  describe("Testing component with favorites", () => {
    beforeEach(() => {
      store = mockStore({
        favorites,
        user,
      });

      wrapper = shallow(<UserFavorites store={store} />);
    });

    test("Should render the component with favorites", () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find("h1").contains("No favorites added.")).toBeFalsy();
    });
    test("Should match the snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    test("Should dispatch action on link click", async () => {
      wrapper.find("Styled(Link)").last().simulate("click");

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: rating,
        });
      });

      await store.dispatch(fetchRating("AMZN"));

      const actions = store.getActions();
      // onClick dispatches two actions
      // and returns markets details (favorite symbol)
      // and rating.
      expect(actions).toEqual([
        {
          type: SET_MARKET_DETAIL,
          payload: favorites[0].symbol[0],
        },
        {
          type: SET_RATING,
          payload: rating,
        },
      ]);
    });
    test("Should delete stock from favorites", async () => {
      wrapper.find("div").last().childAt(0).simulate("click");

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: favorite,
        });
      });

      await store.dispatch(fetchDeleteFavorite(favorite._id));

      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: DELETE_FAVORITE,
          payload: favorite,
        },
      ]);
    });
  });

  describe("Testing component without favorites", () => {
    test("Should render component without favorite stocks", () => {
      store = mockStore({
        user,
        favorites: [],
      });

      wrapper = shallow(<UserFavorites store={store} />);

      expect(wrapper).toHaveLength(1);
      expect(wrapper.find("h1").contains("No favorites added.")).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
  });
  test("Should apply styles to StockPercentage according to default", () => {
    wrapper = renderer.create(<StockPercentage percentage="-1" />).toJSON();
    // Default values in styles
    expect(wrapper).toHaveStyleRule("color", "var(--red)");
  });
  test("Should apply styles to StockPercentage according to passed props", () => {
    wrapper = renderer.create(<StockPercentage percentage="2" />).toJSON();
    // Passed props to component
    expect(wrapper).toHaveStyleRule("color", "var(--green)");
  });
});
