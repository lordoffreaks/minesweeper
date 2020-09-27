import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import { grid, isEnd, socket } from "./reducers";

export const createReduxStore = () => {
  const reducers = combineReducers({
    grid,
    isEnd,
    socket
  });

  const store = createStore(
    reducers,
    composeWithDevTools({})(applyMiddleware(thunk))
  );

  return store;
};
