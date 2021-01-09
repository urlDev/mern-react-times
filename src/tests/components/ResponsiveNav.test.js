import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";
import { user } from "tests/fixtures/user";

import Search from "components/search/Search";
import StoryTopicHeaders from "components/story-topic-headers/StoryTopicHeaders";
import ResponsiveNav from "components/responsive-nav/ResponsiveNav";

describe("Testing ResponsiveNav component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);
  });

  describe("Testing for when the width is smaller than 768", () => {
    beforeEach(() => {
      store = mockStore({
        width: 700,
        user,
      });

      wrapper = mount(
        <Router>
          <ResponsiveNav store={store} />
        </Router>
      );
    });

    test("Should render the component with Nav and Search", () => {
      expect(wrapper).toHaveLength(1);

      expect(wrapper.containsMatchingElement(<Search />)).toBeTruthy();
    });
    test("Should match the snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Testing the component for when the width is bigger than 768", () => {
    beforeEach(() => {
      store = mockStore({
        user,
        width: 900,
      });

      wrapper = mount(
        <Router>
          <ResponsiveNav store={store} />
        </Router>
      );
    });

    test("Should render the component with Nav and StoryTopicHeaders", () => {
      expect(wrapper).toHaveLength(1);

      expect(
        wrapper.containsMatchingElement(<StoryTopicHeaders />)
      ).toBeTruthy();
    });
    test("Should match the snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
