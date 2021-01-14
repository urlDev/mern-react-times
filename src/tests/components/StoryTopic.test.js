import { shallow } from "enzyme";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import StoryTopic from "components/story-topic/StoryTopic";
import { header } from "tests/fixtures/news";

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

  test("Should render the component with header", () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find("h1").text()).toEqual("Home");
  });
  test("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
