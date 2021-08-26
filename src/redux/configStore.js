import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import thunk from "redux-thunk";
import comment from "../redux/modules/comment";
import permit from "../redux/modules/permit";
import review from "../redux/modules/review";
import book from "../redux/modules/book";
import user from "../redux/modules/user";
import upload from "../redux/modules/upload"
import tag from "../redux/modules/tag";
import collection from "./modules/collection";
import search from "./modules/search";


const history = createBrowserHistory();
const rootReducer = combineReducers({
  tag,
  review,
  permit,
  book,
  comment,
  user,
  upload,
  collection,
  search,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history })];

const env = process.env.NODE_ENV;
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);

export { history };
export default store;