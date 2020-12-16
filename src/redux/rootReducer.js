import { combineReducers } from "redux";
// Adding connect router for being able to use history in redux actions
import { connectRouter } from "connected-react-router";

import chartReducer from "./reducers/chart";
import newsReducer from "./reducers/news";
import userReducer from "./reducers/user";
import favoriteReducer from "./reducers/favorite";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    chart: chartReducer,
    news: newsReducer,
    user: userReducer,
    favorite: favoriteReducer,
  });

export default rootReducer;
