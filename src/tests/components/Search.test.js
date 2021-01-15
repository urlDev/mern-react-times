import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import moxios from "moxios";

import * as ReactReduxHooks from "utils/react-redux-hooks";
import { mockStore } from "tests/store";
import { searchResult } from "tests/fixtures/chart";

import {
  CLOSE_SEARCH_MODAL,
  GET_SEARCH_RESULTS,
  OPEN_SEARCH_MODAL,
  fetchSearch,
  TOGGLE_SEARCH_MODAL,
} from "redux/actions/chart";

import Search from "components/search/Search";

describe("Testing Search component", () => {
  let wrapper;
  let store;
  let history;

  beforeEach(() => {
    store = mockStore({
      open: false,
    });

    history = { push: jest.fn() };

    jest.spyOn(history, "push").mockImplementation(() => history.push);

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation((state) => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = mount(
      <Router>
        <Search store={store} history={history} />
      </Router>
    );

    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    jest.clearAllMocks();
  });

  test("Should render the component", () => {
    expect(wrapper).toHaveLength(1);
  });
  test("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Should render and dispatch form with input value", () => {
    const value = "TSLA";

    // I first simulate a change with target value
    wrapper.find("input").simulate("change", { target: { value } });

    // Input in search component also dispatches a search action
    // So in here, I dispatch it with moxios
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: searchResult,
      });
    });

    const expectedResult = [
      { type: GET_SEARCH_RESULTS, payload: searchResult },
    ];

    return store.dispatch(fetchSearch(value)).then(() => {
      const actions = store.getActions();

      // Inputs value is value
      expect(wrapper.find("input").prop("value")).toEqual(value);
      // Dispatching actions
      expect(actions).toEqual(expectedResult);
    });
  });

  test("Should toggle search modal on SearchIcon click", () => {
    wrapper.find("a").simulate("click");

    const actions = store.getActions();

    expect(actions).toEqual([{ type: TOGGLE_SEARCH_MODAL }]);
  });

  test("Should open search modal on form click, width < 768", () => {
    store = mockStore({
      width: 700,
      open: false,
    });

    wrapper = mount(<Search store={store} />);
    wrapper.find("form").simulate("click");

    const actions = store.getActions();
    expect(actions).toEqual([{ type: OPEN_SEARCH_MODAL }]);
  });

  test("Should submit form with given input", () => {
    const value = "TSLA";

    wrapper.find("form").simulate("submit", {
      preventDefault: () => jest.fn(),
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: searchResult,
      });
    });

    const expectedActions = [
      { type: CLOSE_SEARCH_MODAL },
      {
        type: GET_SEARCH_RESULTS,
        payload: searchResult,
      },
    ];

    return store.dispatch(fetchSearch(value)).then(() => {
      const actions = store.getActions();
      history.push(`/search/${value}`);

      expect(actions).toEqual(expectedActions);
      expect(history.push).toBeCalledWith("/search/TSLA");
    });
  });
});
