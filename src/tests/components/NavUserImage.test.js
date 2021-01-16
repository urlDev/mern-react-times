import React from "react";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import moxios from "moxios";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";
import { user } from "tests/fixtures/user";

import {
  LOGOUT_USER,
  USER_MODAL_CLOSE,
  USER_MODAL_OPEN,
  fetchLogoutUser,
} from "redux/actions/user";
import { CLEAN_FAVORITE_STATE } from "redux/actions/favorite";

import UserModal from "components/user-modal/UserModal";
import NavUserImage from "components/nav-user-image/NavUserImage";
import { CLOSE_SEARCH_MODAL } from "redux/actions/chart";

describe("Testing NavUserImage component", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("Testing the component when width is smaller than 768", () => {
    beforeEach(() => {
      // adding user because when UserImageButton renders,
      // User image renders therefore there should be user
      store = mockStore({
        width: 750,
        user,
      });

      wrapper = mount(<NavUserImage store={store} />);
    });

    test("Should render UserImageButton and shouldnt render Button components", () => {
      expect(wrapper).toHaveLength(1);
    });

    test("Should match snapshot with UserImageButton component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    test("Should open user modal when UserImageButton is clicked", () => {
      // Clicking the UserImageButton
      wrapper.find("button").simulate("click");

      // Expecting it to dispatch userModalOpen action
      const actions = store.getActions();
      expect(actions).toEqual([{ type: USER_MODAL_OPEN }]);

      // Updating store
      store = mockStore({
        userModal: true,
        user,
      });

      wrapper = mount(
        <Router>
          <NavUserImage store={store} />
        </Router>
      );
      // Expecting the wrapper to include userModal
      expect(wrapper.containsMatchingElement(<UserModal />)).toEqual(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Testing the component when the width is bigger than 1024", () => {
    beforeEach(() => {
      store = mockStore({
        user,
        width: 1030,
      });

      moxios.install();

      wrapper = mount(<NavUserImage store={store} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
      moxios.uninstall();
    });

    test("Should render Button and UserImageButton components", () => {
      expect(wrapper).toHaveLength(1);
      // Button component is the first button with logout functionality
      expect(wrapper.find("button").first().text()).toEqual("Logout");
    });

    test("Should match the snapshot with Button component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    test("Should dispatch logout action on button click", () => {
      wrapper.find("button").first().simulate("click");

      /*
        After simulating button click, expected action is
        dispatching logout and clean state actions. For logout to work,
        since its an async action, I used moxios to mock it.
      */
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
        });
      });

      return store.dispatch(fetchLogoutUser()).then(() => {
        const actions = store.getActions();

        expect(actions).toEqual([
          { type: CLOSE_SEARCH_MODAL },
          { type: CLEAN_FAVORITE_STATE },
          { type: LOGOUT_USER },
        ]);
      });
    });

    test("Should open user modal on mouse enter", () => {
      const button = wrapper.find("button").last();
      button.simulate("mouseenter");

      const actions = store.getActions();

      expect(actions).toEqual([{ type: USER_MODAL_OPEN }]);
    });
    test("Should close user modal on mouse leave", () => {
      const button = wrapper.find("button").last();
      button.simulate("mouseleave");

      const actions = store.getActions();

      expect(actions).toEqual([{ type: USER_MODAL_CLOSE }]);
    });
  });
});
