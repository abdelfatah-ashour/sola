import { createStore } from "redux";
import { combineReducer } from "./combineReducers";

export const store = createStore(
  combineReducer,
  window !== "undefined" &&
    process.env.REACT_APP_MODE === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
