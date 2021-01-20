import { shallow } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import "jest-styled-components";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";
import HomeMarketCards from "components/home-market-cards/HomeMarketCards";
import { forex, forexLengthTwo, homeChartData } from "tests/fixtures/chart";
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

    wrapper = shallow(
      <Router>
        <HomeMarketCards store={store} />
      </Router>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test("it applies styles according to default props", () => {
    const wrapper = renderer
      .create(
        <Router>
          <MarketCards />
        </Router>
      )
      .toJSON();
    expect(wrapper).toHaveStyleRule("background", "var(--red)");
  });
  test("it applies styles according to passed props", () => {
    const wrapper = renderer
      .create(
        <Router>
          <MarketCards percentage />
        </Router>
      )
      .toJSON();
    expect(wrapper).toHaveStyleRule("background", "var(--green)");
  });
});
