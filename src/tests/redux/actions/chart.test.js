import moxios from "moxios";

import * as ChartActions from "redux/actions/chart";

import { store } from "../../store";

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
} from "tests/fixtures/chart";

test("Should fetch forex successfully", () => {
  const action = ChartActions.fetchForexSuccess(forexLengthTwo);

  expect(action).toEqual({
    type: ChartActions.FETCH_FOREX_SUCCESS,
    payload: forexLengthTwo,
  });
});

test("Should show error if it cant be fetched", () => {
  const action = ChartActions.fetchChartError(errorChart);

  expect(action).toEqual({
    type: ChartActions.FETCH_CHART_ERROR,
    payload: errorChart,
  });
});

test("Should set the loading state to false", () => {
  const action = ChartActions.setLoading();

  expect(action).toEqual({
    type: ChartActions.SET_LOADING,
  });
});

test("Should set the loading state to true", () => {
  const action = ChartActions.setLoadingTrue();

  expect(action).toEqual({
    type: ChartActions.SET_LOADING_TRUE,
  });
});

test("Should change the market name", () => {
  const action = ChartActions.changeMarketName(marketName);

  expect(action).toEqual({
    type: ChartActions.CHANGE_MARKET_NAME,
    payload: marketName,
  });
});

test("Should change the market type", () => {
  const action = ChartActions.changeMarketType(marketType);

  expect(action).toEqual({
    type: ChartActions.CHANGE_MARKET_TYPE,
    payload: marketType,
  });
});

test("Should set the market detail", () => {
  const action = ChartActions.setMarketDetail(marketDetail);

  expect(action).toEqual({
    type: ChartActions.SET_MARKET_DETAIL,
    payload: marketDetail,
  });
});

test("Should clean chart data state", () => {
  const action = ChartActions.cleanChartData();

  expect(action).toEqual({
    type: ChartActions.CLEAN_CHART_DATA,
  });
});

test("Should set the chart data", () => {
  const action = ChartActions.setChartData(chartData);

  expect(action).toEqual({
    type: ChartActions.SET_CHART_DATA,
    payload: chartData,
  });
});

test("Should change time frame", () => {
  const action = ChartActions.setChartTimeFrame(chartTimeFrame);

  expect(action).toEqual({
    type: ChartActions.SET_CHART_TIME_FRAME,
    payload: chartTimeFrame,
  });
});

test("Should set rating", () => {
  const action = ChartActions.setRating(rating);

  expect(action).toEqual({
    type: ChartActions.SET_RATING,
    payload: rating,
  });
});

test("Should set chart data for home cards", () => {
  const action = ChartActions.setHomeChartData(homeChartData);

  expect(action).toEqual({
    type: ChartActions.SET_HOME_CHART_DATA,
    payload: homeChartData,
  });
});

test("Should clean chart data for home page cards", () => {
  const action = ChartActions.cleanState();

  expect(action).toEqual({
    type: ChartActions.CLEAN_STATE,
  });
});

test("Should get search results", () => {
  const action = ChartActions.getSearchResults(searchResult);

  expect(action).toEqual({
    type: ChartActions.GET_SEARCH_RESULTS,
    payload: searchResult,
  });
});

test("Should set the market detail for search result", () => {
  const action = ChartActions.setSearchMarketDetail(marketDetail);

  expect(action).toEqual({
    type: ChartActions.SET_SEARCH_MARKET_DETAIL,
    payload: marketDetail,
  });
});

test("Should clear search results", () => {
  const action = ChartActions.clearSearchResults();

  expect(action).toEqual({
    type: ChartActions.CLEAR_SEARCH_RESULTS,
  });
});

test("Should open the search modal", () => {
  const action = ChartActions.openSearchModal();

  expect(action).toEqual({
    type: ChartActions.OPEN_SEARCH_MODAL,
  });
});

test("Should close the search modal", () => {
  const action = ChartActions.closeSearchModal();

  expect(action).toEqual({
    type: ChartActions.CLOSE_SEARCH_MODAL,
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
          response: forexLengthTwo.data,
        });
      });

      const expectedActions = {
        type: ChartActions.FETCH_FOREX_SUCCESS,
        payload: forexLengthTwo.data,
      };

      return store.dispatch(ChartActions.fetchForex("^DJI")).then(() => {
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
        type: ChartActions.SET_SEARCH_MARKET_DETAIL,
        payload: forexLengthOne,
      };

      return store.dispatch(ChartActions.fetchForex("DJI")).then(() => {
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
        type: ChartActions.FETCH_CHART_ERROR,
        payload: errorChart,
      };

      return store.dispatch(ChartActions.fetchForex("TSLA")).then(() => {
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
        type: ChartActions.FETCH_CHART_ERROR,
        payload: errorChart,
      };

      return store.dispatch(ChartActions.fetchForex("TSLA")).then(() => {
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

      const expectedActions = [
        { type: ChartActions.SET_CHART_DATA, payload: chartData },
      ];

      return store
        .dispatch(ChartActions.fetchChartData("TSLA", chartTimeFrame))
        .then(() => {
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
        { type: ChartActions.FETCH_CHART_ERROR, payload: errorChart },
      ];

      return store
        .dispatch(ChartActions.fetchChartData("TSLA", chartTimeFrame))
        .then(() => {
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
        type: ChartActions.SET_RATING,
        payload: rating,
      };

      return store.dispatch(ChartActions.fetchRating("TSLA")).then(() => {
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
        type: ChartActions.FETCH_CHART_ERROR,
        payload: errorChart,
      };

      return store.dispatch(ChartActions.fetchRating("TSLA")).then(() => {
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
        { type: ChartActions.CLEAN_STATE },
        { type: ChartActions.SET_LOADING_TRUE },
        {
          type: ChartActions.FETCH_CHART_ERROR,
          payload: errorChart,
        },
      ];

      return store
        .dispatch(ChartActions.fetchHomeChart(marketType))
        .then(() => {
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
        type: ChartActions.GET_SEARCH_RESULTS,
        payload: searchResult,
      };

      return store.dispatch(ChartActions.fetchSearch("TSLA")).then(() => {
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
        type: ChartActions.FETCH_CHART_ERROR,
        payload: errorChart,
      };

      return store.dispatch(ChartActions.fetchSearch("TSLA")).then(() => {
        const actionsGetCalled = store.getActions();

        expect(actionsGetCalled[0]).toEqual(expectedActions);
      });
    });
  });
});
