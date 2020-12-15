import { combineReducers } from 'redux';
// Adding connect router for being able to use history in redux actions
import { connectRouter } from 'connected-react-router';

import chartReducer from './reducers/chart';
import newsReducer from './reducers/news';
import userReducer from './reducers/user';

const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        chart: chartReducer,
        news: newsReducer,
        user: userReducer,
    });

export default rootReducer;