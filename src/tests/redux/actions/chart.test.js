import moxios from "moxios";

import {
  FETCH_FOREX_SUCCESS,
  FETCH_CHART_ERROR,
  SET_LOADING,
  SET_LOADING_TRUE,
  CHANGE_MARKET_NAME,
  CHANGE_MARKET_TYPE,
  SET_MARKET_DETAIL,
  SET_CHART_DATA,
  CLEAN_CHART_DATA,
  SET_CHART_TIME_FRAME,
  SET_RATING,
  SET_HOME_CHART_DATA,
  CLEAN_STATE,
  GET_SEARCH_RESULTS,
  SET_SEARCH_MARKET_DETAIL,
  CLEAR_SEARCH_RESULTS,
  OPEN_SEARCH_MODAL,
  CLOSE_SEARCH_MODAL,
  closeSearchModal,
  openSearchModal,
  clearSearchResults,
  setSearchMarketDetail,
  getSearchResults,
  setLoading,
  setLoadingTrue,
  cleanState,
  setHomeChartData,
  setRating,
  setChartTimeFrame,
  setChartData,
  cleanChartData,
  setMarketDetail,
  changeMarketType,
  changeMarketName,
  fetchForexSuccess,
  fetchChartError,
  fetchForex,
  fetchChartData,
  fetchRating,
  fetchHomeChart,
  fetchSearch,
} from "../../../redux/actions/chart";

// eslint-disable-next-line jest/no-mocks-import
import { store } from "../../__mocks__/store";

import {
  forexLengthTwo,
  forexLengthOne,
  chartTimeFrame,
  marketType,
  marketName,
  rating,
  searchResult,
  errorChart,
  marketDetail,
  chartData,
  homeChartData,
} from "../../fixtures/chart";

test("Should fetch forex successfully", () => {
  const action = fetchForexSuccess(forexLengthTwo);

  expect(action).toEqual({
    type: FETCH_FOREX_SUCCESS,
    payload: forexLengthTwo,
  });
});

test("Should show error if it cant be fetched", () => {
  const action = fetchChartError(errorChart);

  expect(action).toEqual({
    type: FETCH_CHART_ERROR,
    payload: errorChart,
  });
});

test("Should set the loading state to false", () => {
  const action = setLoading();

  expect(action).toEqual({
    type: SET_LOADING,
  });
});

test("Should set the loading state to true", () => {
  const action = setLoadingTrue();

  expect(action).toEqual({
    type: SET_LOADING_TRUE,
  });
});

test("Should change the market name", () => {
  const action = changeMarketName(marketName);

  expect(action).toEqual({
    type: CHANGE_MARKET_NAME,
    payload: marketName,
  });
});

test("Should change the market type", () => {
  const action = changeMarketType(marketType);

  expect(action).toEqual({
    type: CHANGE_MARKET_TYPE,
    payload: marketType,
  });
});

test("Should set the market detail", () => {
  const action = setMarketDetail(marketDetail);

  expect(action).toEqual({
    type: SET_MARKET_DETAIL,
    payload: marketDetail,
  });
});

test("Should clean chart data state", () => {
  const action = cleanChartData();

  expect(action).toEqual({
    type: CLEAN_CHART_DATA,
  });
});

test("Should set the chart data", () => {
  const action = setChartData(chartData);

  expect(action).toEqual({
    type: SET_CHART_DATA,
    payload: chartData,
  });
});

test("Should change time frame", () => {
  const action = setChartTimeFrame(chartTimeFrame);

  expect(action).toEqual({
    type: SET_CHART_TIME_FRAME,
    payload: chartTimeFrame,
  });
});

test("Should set rating", () => {
  const action = setRating(rating);

  expect(action).toEqual({
    type: SET_RATING,
    payload: rating,
  });
});

test("Should set chart data for home cards", () => {
  const action = setHomeChartData(homeChartData);

  expect(action).toEqual({
    type: SET_HOME_CHART_DATA,
    payload: homeChartData,
  });
});

test("Should clean chart data for home page cards", () => {
  const action = cleanState();

  expect(action).toEqual({
    type: CLEAN_STATE,
  });
});

test("Should get search results", () => {
  const action = getSearchResults(searchResult);

  expect(action).toEqual({
    type: GET_SEARCH_RESULTS,
    payload: searchResult,
  });
});

test("Should set the market detail for search result", () => {
  const action = setSearchMarketDetail(marketDetail);

  expect(action).toEqual({
    type: SET_SEARCH_MARKET_DETAIL,
    payload: marketDetail,
  });
});

test("Should clear search results", () => {
  const action = clearSearchResults();

  expect(action).toEqual({
    type: CLEAR_SEARCH_RESULTS,
  });
});

test("Should open the search modal", () => {
  const action = openSearchModal();

  expect(action).toEqual({
    type: OPEN_SEARCH_MODAL,
  });
});

test("Should close the search modal", () => {
  const action = closeSearchModal();

  expect(action).toEqual({
    type: CLOSE_SEARCH_MODAL,
  });
});

describe("Testing async functions", () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("Testing fetchForex async function", () => {
    test("Should fetch the data successfully, at initial load", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: forexLengthTwo,
        });
      });

      const expectedActions = {
        type: FETCH_FOREX_SUCCESS,
        payload: forexLengthTwo,
      };

      return store.dispatch(fetchForex("^DJI")).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });

    test("Should fetch the data after a search is made and result is clicked", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: forexLengthOne,
        });
      });

      const expectedActions = {
        type: SET_SEARCH_MARKET_DETAIL,
        payload: forexLengthOne,
      };

      return store.dispatch(fetchForex("DJI")).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });

    test("Should show error because of API/Limit issues", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: errorChart,
        });
      });

      const expectedActions = {
        type: FETCH_CHART_ERROR,
        payload: errorChart,
      };

      return store.dispatch(fetchForex("TSLA")).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });

    test("Should show error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorChart);
      });

      const expectedActions = {
        type: FETCH_CHART_ERROR,
        payload: errorChart,
      };

      return store.dispatch(fetchForex("TSLA")).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });
  });

  describe("Testing fetchChartData async function", () => {
    test("Should fetch chart data successfully", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: chartData,
        });
      });

      const expectedActions = [{ type: SET_CHART_DATA, payload: chartData }];

      return store.dispatch(fetchChartData("TSLA", chartTimeFrame)).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });

    test("Should show error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorChart);
      });

      const expectedActions = [
        { type: FETCH_CHART_ERROR, payload: errorChart },
      ];

      return store.dispatch(fetchChartData("TSLA", chartTimeFrame)).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });
  });

  describe("Testing fetchRating function", () => {
    test("Should set the rating correctly", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: rating,
        });
      });

      const expectedActions = {
        type: SET_RATING,
        payload: rating,
      };

      return store.dispatch(fetchRating("TSLA")).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });

    test("Should show error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorChart);
      });

      const expectedActions = {
        type: FETCH_CHART_ERROR,
        payload: errorChart,
      };

      return store.dispatch(fetchRating("TSLA")).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });
  });

  describe("Testing fetchHomeChart async function", () => {
    //   test("Should fetch the charts successfully", () => {
    //     moxios.wait(() => {
    //       const request = moxios.requests.mostRecent();
    //       request.respondWith({
    //         status: 200,
    //         response: chartData,
    //       });
    //     });

    //     const expectedActions = [
    //       { type: CLEAN_STATE },
    //       { type: SET_LOADING_TRUE },
    //       {
    //         type: SET_HOME_CHART_DATA,
    //         payload: [chartData],
    //       },
    //       { type: SET_LOADING },
    //     ];

    //     return store.dispatch(fetchHomeChart(marketType)).then(() => {
    //       const actionsGetCalled = store.getActions();

    //       expect(actionsGetCalled).toEqual(expectedActions);
    //     });
    //   });

    // test("Should show an error if there is limit/API related problems", () => {
    //   moxios.wait(() => {
    //     const request = moxios.requests.mostRecent();
    //     request.respondWith({
    //       status: 200,
    //       response: errorChart,
    //     });
    //   });

    //   const expectedActions = [
    //     { type: CLEAN_STATE },
    //     { type: SET_LOADING_TRUE },
    //     {
    //       type: FETCH_CHART_ERROR,
    //       payload: errorChart,
    //     },
    //     { type: SET_LOADING },
    //   ];

    //   return store.dispatch(fetchHomeChart(marketType)).then(() => {
    //     const actionsGetCalled = store.getActions();

    //     expect(actionsGetCalled).toEqual(expectedActions);
    //   });
    // });

    test("Should show error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorChart);
      });

      const expectedActions = [
        { type: CLEAN_STATE },
        { type: SET_LOADING_TRUE },
        {
          type: FETCH_CHART_ERROR,
          payload: errorChart,
        },
      ];

      return store.dispatch(fetchHomeChart(marketType)).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled).toEqual(expectedActions);
      });
    });
  });

  describe("Testing fetchSearch async function", () => {
    test("Should fetch the results successfully", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: searchResult,
        });
      });

      const expectedActions = {
        type: GET_SEARCH_RESULTS,
        payload: searchResult,
      };

      return store.dispatch(fetchSearch("TSLA")).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });

    test("Should show an error if there is any", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(errorChart);
      });

      const expectedActions = {
        type: FETCH_CHART_ERROR,
        payload: errorChart,
      };

      return store.dispatch(fetchSearch("TSLA")).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });
  });
});
