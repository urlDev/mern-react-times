import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import "jest-styled-components";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import { user, userWebP } from "tests/fixtures/user";

import UserImage from "components/user-image/UserImage";
import { UserPicture } from "components/user-image/UserImage.styles";

describe("Testing UserImage component", () => {
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
  test("Should apply styles to UserPicture according to default", () => {
    wrapper = renderer.create(<UserPicture />).toJSON();
    // Default values in styles
    expect(wrapper).toHaveStyleRule("margin-left", "0");
    // expect(wrapper).toHaveStyleRule("width", "29px");
    // expect(wrapper).toHaveStyleRule("border-radius", "0");
  });
  test("Should apply styles to UserPicture according to passed props", () => {
    wrapper = renderer
      .create(<UserPicture margin="10px" width="100%" border="29px" />)
      .toJSON();
    // Passed props to component
    expect(wrapper).toHaveStyleRule("margin-left", "10px");
    // expect(wrapper).toHaveStyleRule("width", "100%");
    // expect(wrapper).toHaveStyleRule("border-radius", "29px");
  });
});
