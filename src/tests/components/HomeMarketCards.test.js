import { shallow } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import moxios from "moxios";
import renderer from "react-test-renderer";
import "jest-styled-components";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import { forex, homeChartData, rating } from "tests/fixtures/chart";
import {
  fetchRating,
  SET_MARKET_DETAIL,
  SET_RATING,
} from "redux/actions/chart";

import HomeMarketCards from "components/home-market-cards/HomeMarketCards";
import { MarketCards } from "components/home-market-cards/HomeMarketCards.styles";

describe("Testing HomeMarketCards component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore({
      forex,
      homeChartData,
    });

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    wrapper = shallow(<HomeMarketCards store={store} />);

    moxios.install();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    moxios.uninstall();
  });

  test("Should render the component", () => {
    expect(wrapper).toHaveLength(1);
    // MarketCards is rendered
    expect(wrapper.childAt(0).childAt(0).prop("percentage")).toBeTruthy();
  });

  test("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Should dispatch actions on MarketCards click", async () => {
    wrapper.childAt(0).childAt(0).simulate("click");

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: rating,
      });
    });

    const expectedActions = [
      {
        type: SET_MARKET_DETAIL,
        payload: forex[0],
      },
      { type: SET_RATING, payload: rating },
    ];

    await store.dispatch(fetchRating(forex[0]));

    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  test("Should apply styles according to default props", () => {
    const wrapper = renderer
      .create(
        <Router>
          <MarketCards to="" />
        </Router>
      )
      .toJSON();
    expect(wrapper).toHaveStyleRule("background", "var(--red)");
  });
  test("Should apply styles according to passed props", () => {
    const wrapper = renderer
      .create(
        <Router>
          <MarketCards percentage to="" />
        </Router>
      )
      .toJSON();
    expect(wrapper).toHaveStyleRule("background", "var(--green)");
  });
});
