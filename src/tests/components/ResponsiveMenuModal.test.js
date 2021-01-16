import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import {
  CHANGE_HEADER,
  CLEAR_ERROR,
  CLOSE_RESPONSIVE_MENU,
} from "redux/actions/news";

import ResponsiveMenuModal from "components/responsive-menu-modal/ResponsiveMenuModal";

describe("Testing ResponsiveMenuModal component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore({
      responsiveMenu: true,
    });

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = mount(
      <Router>
        <ResponsiveMenuModal store={store} />
      </Router>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  test("Should render the component", () => {
    expect(wrapper).toHaveLength(1);
  });

  test("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Should close responsive menu on click container click", () => {
    wrapper.find("div").first().simulate("click");
    const actions = store.getActions();

    expect(actions).toEqual([{ type: CLOSE_RESPONSIVE_MENU }]);
  });

  test("Should close responsive menu on menu click", () => {
    wrapper.find("span").first().simulate("click");
    const actions = store.getActions();

    expect(actions).toEqual([
      { type: CHANGE_HEADER, payload: "home" },
      { type: CLOSE_RESPONSIVE_MENU },
      { type: CLEAR_ERROR },
      { type: CLOSE_RESPONSIVE_MENU },
    ]);
  });
});
