import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import moxios from "moxios";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";
import SearchResults from "components/search-results/SearchResults";
import {
  forexLengthTwo,
  rating,
  searchResult,
  searchResults,
} from "tests/fixtures/chart";
import {
  CLEAR_SEARCH_RESULTS,
  FETCH_FOREX_SUCCESS,
  SET_RATING,
  fetchForex,
} from "redux/actions/chart";

describe("Testing SearchResults component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);
  });

  describe("Testing component with search results", () => {
    beforeEach(() => {
      store = mockStore({
        searchResults,
      });

      wrapper = mount(
        <Router>
          <SearchResults store={store} />
        </Router>
      );

      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    test("Should render the component", () => {
      expect(wrapper).toHaveLength(1);
    });

    test("Should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    test("Should dispatch actions when clicked on search result", async () => {
      wrapper.find("a").first().simulate("click");

      // When clicking on search result
      // It will dispatch two async functions
      // I return their results here
      // with mocking the process
      moxios.wait(() => {
        // at(0) and at(0) didnt work together
        // so I put mostRecent() for one of them
        const firstRequest = moxios.requests.mostRecent();
        firstRequest.respondWith({
          status: 200,
          response: forexLengthTwo.data,
        });
        const secondRequest = moxios.requests.at(1);
        secondRequest.respondWith({
          status: 200,
          response: rating,
        });
      });

      const expectedResults = [
        { type: CLEAR_SEARCH_RESULTS },
        { type: FETCH_FOREX_SUCCESS, payload: forexLengthTwo.data },
        {
          type: SET_RATING,
          payload: rating,
        },
      ];

      // async/await works just like return too
      await store.dispatch(fetchForex("TSLA"));

      const actions = store.getActions();
      expect(actions).toEqual(expectedResults);
    });
  });
  test("Should render no results found if there are no results", () => {
    store = mockStore({
      searchResults: searchResult,
    });

    wrapper = mount(<SearchResults store={store} />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});
