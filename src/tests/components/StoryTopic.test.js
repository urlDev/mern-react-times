import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import "jest-styled-components";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import StoryTopic from "components/story-topic/StoryTopic";
import { header } from "tests/fixtures/news";
import { TimeFrame } from "components/story-topic/StoryTopic.styles";

describe("Testing StoryTopic component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore({
      header,
    });

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    wrapper = shallow(<StoryTopic store={store} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test("Should render the component with header", () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find("h1").text()).toEqual("Home");
  });
  test("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Should apply styles to TimeFrame according to default", () => {
    wrapper = renderer.create(<TimeFrame />).toJSON();
    // Default values in styles
    expect(wrapper).toHaveStyleRule("background", "var(--background)");
    expect(wrapper).toHaveStyleRule("color", "black");
    expect(wrapper).toHaveStyleRule("border", "1px solid black");
  });
  test("Should apply styles to TimeFrame according to passed props", () => {
    wrapper = renderer.create(<TimeFrame active />).toJSON();
    // Passed props to component
    expect(wrapper).toHaveStyleRule("background", "black");
    expect(wrapper).toHaveStyleRule("color", "white");
    expect(wrapper).toHaveStyleRule("border", "1px solid transparent");
  });
});
