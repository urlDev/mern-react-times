import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import moment from "moment";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import StoryTopicHeaders from "components/story-topic-headers/StoryTopicHeaders";
import ResponsiveMenuModal from "components/responsive-menu-modal/ResponsiveMenuModal";
import ResponsiveMenu from "components/responsive-menu/ResponsiveMenu";
import { CHANGE_HEADER, CLEAR_ERROR } from "redux/actions/news";

describe("Testing StoryTopicHeaders component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    // Mocking moment().format()
    Date.now = jest.fn(() => new Date("2021-01-16T00:00:00.000Z"));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("Testing the component for when width is smaller than 1024", () => {
    beforeEach(() => {
      store = mockStore({
        width: 900,
        responsiveMenu: true,
      });

      wrapper = mount(
        <Router>
          <StoryTopicHeaders store={store} />
        </Router>
      );
    });
    test("Should render the component with ResponsiveMenu and modal", () => {
      expect(wrapper).toHaveLength(1);
      expect(
        wrapper.containsMatchingElement(<ResponsiveMenuModal />)
      ).toBeTruthy();
      expect(wrapper.containsMatchingElement(<ResponsiveMenu />)).toBeTruthy();
    });
    test("Should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
    test("Should not show modal if its false", () => {
      store = mockStore({
        width: 900,
        responsiveMenu: false,
      });

      wrapper = mount(<StoryTopicHeaders store={store} />);

      expect(
        wrapper.containsMatchingElement(<ResponsiveMenuModal />)
      ).toBeFalsy();
    });
  });

  describe("Testing component for when width is bigger than 1024", () => {
    beforeEach(() => {
      store = mockStore({
        width: 1100,
        responsiveMenu: true,
      });

      wrapper = mount(
        <Router>
          <StoryTopicHeaders store={store} />
        </Router>
      );
    });

    test("Should render the component with topics", () => {
      expect(wrapper).toHaveLength(1);
      // Having home in wrapper means topics are rendered successfully
      expect(wrapper.find("Home")).toBeTruthy();
    });
    test("Should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
    test("Should dispatch actions when clicked on a topic", () => {
      // I defined the actions in a span inside link
      // thats why I am clicking on one of them
      wrapper.find("span").at(1).simulate("click");

      const actions = store.getActions();

      expect(actions).toEqual([
        { type: CHANGE_HEADER, payload: "home" },
        { type: CLEAR_ERROR },
      ]);
    });
  });
});
