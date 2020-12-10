import { combineReducers } from 'redux';

import chartReducer from './reducers/chart';
import newsReducer from './reducers/news';
import userReducer from './reducers/user';

const rootReducer = combineReducers({
    chart: chartReducer,
    news: newsReducer,
    user: userReducer,
});

export default rootReducer;