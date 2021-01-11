import { mount, shallow } from "enzyme";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import { story } from "tests/fixtures/news";

import TopStories from "components/top-stories/TopStories";

describe("Testing TopStories component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore({
      width: 1000,
      story: story.results[0],
    });

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    wrapper = mount(<TopStories store={store} />);
  });

  test("Should render component", () => {
    expect(wrapper).toHaveLength(1);
    // checking for if h1 has text of story section ('us' in here)
    expect(wrapper.find("span").first().text()).toEqual("us");
  });
  test("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Should show other url when width is bigger than 1200", () => {
    store = mockStore({
      width: 1300,
      story: story.results[0],
    });

    wrapper = shallow(<TopStories store={store} />);

    expect(wrapper).toHaveLength(1);
    // checking for if the img has a src prop still after changing width
    expect(wrapper.find("img").prop("src")).toBeTruthy();
  });
});
