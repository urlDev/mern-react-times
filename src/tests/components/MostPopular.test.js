import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import "jest-styled-components";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import MostPopular from "components/most-popular/MostPopular";
import { popularWithoutMedia, width } from "tests/fixtures/news";
import {
  ImageContainer,
  StoryTitle,
} from "components/most-popular/MostPopular.styles";

describe("Testing MostPopular component", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("Testing the component with popular news fetched", () => {
    beforeEach(() => {
      store = mockStore({
        popular: popularWithoutMedia,
        width,
      });

      wrapper = mount(<MostPopular store={store} />);
    });

    test("Should render with popular news", () => {
      expect(wrapper).toHaveLength(1);
    });
    test("Should match the snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
    test("Should get the state", () => {
      const state = store.getState();

      expect(state).toEqual({ popular: popularWithoutMedia, width });
    });
  });
  describe("Testing the component without any news state", () => {
    beforeEach(() => {
      store = mockStore({
        popular: [],
      });

      wrapper = shallow(<MostPopular store={store} />);
    });

    test("Should render component without news", () => {
      expect(wrapper).toHaveLength(1);
    });
    test("Should match the snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  test("Should apply styles to ImageContainer according to url prop", () => {
    wrapper = renderer
      .create(<ImageContainer background="/imageUrl" />)
      .toJSON();
    // Passing background url prop
    expect(wrapper).toHaveStyleRule("background", "url(/imageUrl) no-repeat");
  });
  test("Should apply styles to StoryTitle according to default", () => {
    wrapper = renderer.create(<StoryTitle />).toJSON();
    // Default values in styles
    expect(wrapper).toHaveStyleRule("font-family", "var(--font-text)");
    expect(wrapper).toHaveStyleRule("color", "black");
  });
  test("Should apply styles to StoryTitle according to passed props", () => {
    wrapper = renderer
      .create(<StoryTitle font="var(--font-header)" color="white" />)
      .toJSON();
    // Passed props to component
    expect(wrapper).toHaveStyleRule("font-family", "var(--font-header)");
    expect(wrapper).toHaveStyleRule("color", "white");
  });
});
