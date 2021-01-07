import { mount } from "enzyme";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import ResponsiveMenu from "components/responsive-menu/ResponsiveMenu";
import { OPEN_RESPONSIVE_MENU } from "redux/actions/news";

describe("Testing ResponsiveMenu component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    store = mockStore({
      responsiveMenu: false,
    });

    wrapper = mount(<ResponsiveMenu store={store} />);
  });

  test("Should render the component", () => {
    expect(wrapper).toHaveLength(1);
  });

  test("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Should openResponsiveMenu on menu click", () => {
    wrapper.find("div").simulate("click");

    const actions = store.getActions();

    expect(actions).toEqual([{ type: OPEN_RESPONSIVE_MENU }]);
  });

  test("Should change img src when responsive menu is open", () => {
    store = mockStore({
      responsiveMenu: true,
    });

    wrapper = mount(<ResponsiveMenu store={store} />);

    expect(wrapper).toMatchSnapshot();
    // Img source changes when responsiveMenu opens, testing that here
    expect(wrapper.find("img").prop("src")).toEqual("hamburgerClose.svg");
  });
});
