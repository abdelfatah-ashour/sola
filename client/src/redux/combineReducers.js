import { combineReducers } from "redux";
import { authReducer } from "./Reducers/auth";
import { chatReducer } from "./Reducers/chat";

export const combineReducer = combineReducers({
  Auth: authReducer,
  Chat: chatReducer,
});
