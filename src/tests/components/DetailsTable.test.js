import { shallow } from "enzyme";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";

import { marketDetail, rating } from "tests/fixtures/chart";

import DetailsTable from "components/details-table/DetailsTable";

describe("Testing DetailsTable component", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({
      marketDetail,
      rating,
    });

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(() => store.getState());

    wrapper = shallow(<DetailsTable store={store} />);
  });

  test("Should render the component with marketDetail and rating", () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find("td").first().text()).toEqual("Symbol");
    expect(wrapper.find("td").last().text()).toEqual(
      rating[0].ratingDetailsROERecommendation
    );
  });
  test("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Should not show rating if it doesnt exist", () => {
    store = mockStore({
      marketDetail,
      rating: [],
    });

    wrapper = shallow(<DetailsTable store={store} />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find("td").last().text()).not.toEqual(
      rating[0].ratingDetailsROERecommendation
    );
    expect(wrapper).toMatchSnapshot();
  });
  test("Should not show marketDetails if it doesnt exist", () => {
    store = mockStore({
      marketDetail: [],
      rating,
    });

    wrapper = shallow(<DetailsTable store={store} />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find("td").first().text()).not.toEqual("Symbol");
    expect(wrapper).toMatchSnapshot();
  });
});
