import { shallow } from "enzyme";

import StoryComponents from "components/story-components/StoryComponents";
import TopStories from "components/top-stories/TopStories";
import MostPopular from "components/most-popular/MostPopular";

describe("Testing StoryComponents", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<StoryComponents />);
  });

  test("Should render the components", () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper.containsMatchingElement(<TopStories />)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<MostPopular />)).toBeTruthy();
  });
  test("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
