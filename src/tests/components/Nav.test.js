import React from "react";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";
import { user } from "tests/fixtures/user";

import Nav from "components/nav/Nav";
import Search from "components/search/Search";
import StoryTopicHeaders from "components/story-topic-headers/StoryTopicHeaders";
import { CLOSE_SEARCH_MODAL } from "redux/actions/chart";

// Test it with width smaller than 768 and bigger than 768
// Check if StoryTopicHeaders and Search has been rendered

describe("Testing Nav component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    Date.now = jest.fn(() => new Date("2021-01-16T00:00:00.000Z"));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("Testing the component without user components", () => {
    beforeEach(() => {
      store = mockStore({
        user: {},
        width: 900,
      });

      wrapper = shallow(<Nav store={store} />);
    });

    test("Should render the component without user components", () => {
      expect(wrapper).toHaveLength(1);
    });
    test("Should match snapshot, width > 900", () => {
      expect(wrapper).toMatchSnapshot();
    });

    test("Should render Search component", () => {
      // when width is more than 768, Search component renders
      expect(wrapper.containsMatchingElement(<Search />)).toEqual(true);
    });
    test("Should close search modal on button click", () => {
      wrapper.find("Link").childAt(0).simulate("click");

      const actions = store.getActions();
      expect(actions).toEqual([{ type: CLOSE_SEARCH_MODAL }]);
    });
  });

  describe("Should render the component with user components and state", () => {
    beforeEach(() => {
      store = mockStore({
        user,
        width: 700,
      });

      wrapper = mount(
        <Router>
          <Nav store={store} />
        </Router>
      );
    });
    test("Should render the component", () => {
      expect(wrapper).toHaveLength(1);
    });
    test("Should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
    test("Should get the state", () => {
      const state = store.getState();

      expect(state).toEqual({ user, width: 700 });
    });
    test("Should render StoryTopicHeader component, width < 768", () => {
      expect(wrapper.containsMatchingElement(<StoryTopicHeaders />)).toEqual(
        true
      );
    });
  });
});
