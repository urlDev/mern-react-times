import { shallow } from "enzyme";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import { user } from "tests/fixtures/user";

import UserDetails from "components/user-details/UserDetails";
import UserAvatar from "components/user-avatar/UserAvatar";
import UserUpdate from "components/user-update/UserUpdate";
import DeleteModal from "components/delete-modal/DeleteModal";

describe("Testing UserDetails component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("Testing the component with user", () => {
    beforeEach(() => {
      store = mockStore({
        user,
        deleteModal: false,
        width: 1100,
      });

      wrapper = shallow(<UserDetails store={store} />);
    });

    test("Should render the component when width is smaller than 1150", () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.containsMatchingElement(<UserUpdate />)).toBeTruthy();
    });
    test("Should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
    test("Should render the component when width is bigger than 1150", () => {
      store = mockStore({
        width: 1200,
        user,
        deleteModal: false,
      });

      wrapper = shallow(<UserDetails store={store} />);
      expect(wrapper).toHaveLength(1);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe("Testing component without user", () => {
    beforeEach(() => {
      store = mockStore({
        user: {},
        width: 1200,
        deleteModal: false,
      });

      wrapper = shallow(<UserDetails store={store} />);
    });

    test("Should render component without user", () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.containsMatchingElement(<UserAvatar />)).toBeFalsy();
      expect(wrapper.containsMatchingElement(<DeleteModal />)).toBeFalsy();
    });
    test("Should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
    test("Should show delete modal", () => {
      store = mockStore({
        user,
        deleteModal: true,
        width: 1100,
      });

      wrapper = shallow(<UserDetails />);

      expect(wrapper).toHaveLength(1);
      expect(wrapper.containsMatchingElement(<DeleteModal />)).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
