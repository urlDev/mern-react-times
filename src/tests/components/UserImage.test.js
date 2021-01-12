import { shallow } from "enzyme";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import { user, userWebP } from "tests/fixtures/user";

import UserImage from "components/user-image/UserImage";

describe("Testing UserImage component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());
  });

  describe("Testing component with user", () => {
    beforeEach(() => {
      store = mockStore({
        user,
      });

      wrapper = shallow(<UserImage store={store} />);
    });
    test("Should render component with user and png", () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find("source").prop("type")).toEqual("image/png");
    });
    test("Should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
    test("Should render component with webp", () => {
      store = mockStore({
        user: userWebP,
      });

      wrapper = shallow(<UserImage store={store} />);

      expect(wrapper).toHaveLength(1);
      expect(wrapper.find("source").first().prop("type")).toEqual("image/webp");
      expect(wrapper).toMatchSnapshot();
    });
  });
  test("Should not render component", () => {
    store = mockStore({
      user: {},
    });

    // If there is no user, component wont show, empty object
    wrapper = shallow(<UserImage store={store} />);
    expect(wrapper).toEqual({});
  });
});
