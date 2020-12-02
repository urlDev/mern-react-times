import axios from 'axios';

export const FETCH_FOREX_SUCCESS = 'FETCH_CHART_SUCCESS';
export const FETCH_CHART_ERROR = 'FETCH_CHART_ERROR';
export const CHANGE_MARKET_TYPE = 'CHANGE_MARKET_TYPE';
export const SET_MARKET_DETAIL = 'SET_MARKET_DETAIL';
export const SET_CHART_DATA = 'SET_CHART_DATA';
export const SET_CHART_TIME_FRAME = 'SET_CHART_TIME_FRAME';
export const SET_RATING = 'SET_RATING';
export const SET_HOME_CHART_DATA = 'SET_HOME_CHART_DATA';

export const setHomeChartData = (chart, index) => ({
    type: SET_HOME_CHART_DATA,
    payload: [chart, index],
});

export const setRating = (rating) => ({
    type: SET_RATING,
    payload: rating,
});

export const setChartTimeFrame = (time) => ({
    type: SET_CHART_TIME_FRAME,
    payload: time,
});

export const setChartData = (data) => ({
    type: SET_CHART_DATA,
    payload: data,
});

export const setMarketDetail = (market) => ({
    type: SET_MARKET_DETAIL,
    payload: market,
});

export const changeMarketType = (market) => ({
    type: CHANGE_MARKET_TYPE,
    payload: market,
});

export const fetchForexSuccess = (chart) => ({
    type: FETCH_FOREX_SUCCESS,
    payload: chart,
});

export const fetchChartError = (error) => ({
    type: FETCH_CHART_ERROR,
    payload: error,
});

export const fetchForex = (market) => async(dispatch) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${market}?apikey=${process.env.REACT_APP_CHART_KEY}`,
        );
        const data = await response.data;
        return dispatch(fetchForexSuccess(data));
    } catch (error) {
        return dispatch(fetchChartError(error));
    }
};

export const fetchChartData = (symbol, timeFrame) => async(dispatch) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/historical-chart/${timeFrame}/${symbol}?apikey=${process.env.REACT_APP_CHART_KEY}`,
        );
        const data = await response.data;
        return dispatch(setChartData(data));
    } catch (error) {
        return dispatch(fetchChartError(error));
    }
};

export const fetchRating = (symbol) => async(dispatch) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/rating/${symbol}?apikey=${process.env.REACT_APP_CHART_KEY}`,
        );
        const data = await response.data;
        return dispatch(setRating(data));
    } catch (error) {
        return dispatch(fetchChartError(error));
    }
};

export const fetchHomeChart = (symbols) => async(dispatch) => {
    const symbolsArray = symbols.split(',').sort();
    try {
        symbolsArray.map(async(symbol, index) => {
            const response = await axios.get(
                `https://financialmodelingprep.com/api/v3/historical-chart/1hour/${symbol}?apikey=${process.env.REACT_APP_CHART_KEY}`,
            );
            const data = await response.data;
            return dispatch(setHomeChartData(data, index));
        });
    } catch (error) {
        return dispatch(fetchChartError(error));
    }
};