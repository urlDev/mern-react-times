import { shallow } from "enzyme";
import moxios from "moxios";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import {
  fetchLogoutUser,
  LOGOUT_USER,
  USER_MODAL_CLOSE,
  USER_MODAL_OPEN,
} from "redux/actions/user";
import { CLEAN_FAVORITE_STATE } from "redux/actions/favorite";

import UserModal from "components/user-modal/UserModal";

describe("Testing UserModal component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
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
  });
  describe("Testing the component when width is smaller than 1024", () => {
    beforeEach(() => {
      store = mockStore({
        width: 700,
      });

      wrapper = shallow(<UserModal store={store} />);
    });

    test("Should render component", () => {
      expect(wrapper).toHaveLength(1);
      // Width is smaller than 700, so logout shouldn't be shown
      expect(wrapper.find("span").text()).toEqual("Logout");
    });
    test("Should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
    test("Should close modal on click", () => {
      wrapper.childAt(0).simulate("click");

      const actions = store.getActions();
      expect(actions).toEqual([{ type: USER_MODAL_CLOSE }]);
    });
    test("Should logout when clicked on logout button", async () => {
      wrapper.find("span").simulate("click");

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
        });
      });

      await store.dispatch(fetchLogoutUser());
      const actions = store.getActions();
      expect(actions).toEqual([
        { type: CLEAN_FAVORITE_STATE },
        { type: LOGOUT_USER },
      ]);
    });
  });

  describe("Testing component when width is bigger than 1024", () => {
    beforeEach(() => {
      store = mockStore({
        width: 1400,
      });

      wrapper = shallow(<UserModal store={store} />);
    });

    test("Should render component", () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.childAt(0).prop("onMouseEnter")).toBeTruthy();
    });
    test("Should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
    test("Should open the modal onMouseEnter", () => {
      wrapper.childAt(0).simulate("mouseenter");

      const actions = store.getActions();
      expect(actions).toEqual([{ type: USER_MODAL_OPEN }]);
    });
    test("Should close the modal onMouseLeave", () => {
      wrapper.childAt(0).simulate("mouseleave");

      const actions = store.getActions();
      expect(actions).toEqual([{ type: USER_MODAL_CLOSE }]);
    });
  });

  test("Should not show logout button when width is bigger than 768", () => {
    store = mockStore({
      width: 800,
    });

    wrapper = shallow(<UserModal store={store} />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find("span")).toHaveLength(0);
  });
});
