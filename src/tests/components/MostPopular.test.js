import React from "react";
import { shallow, mount } from "enzyme";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import MostPopular from "components/most-popular/MostPopular";
import { popularWithoutMedia, width } from "tests/fixtures/news";

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
});
