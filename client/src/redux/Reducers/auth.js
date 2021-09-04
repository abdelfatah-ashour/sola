import { LOGIN, LOGOUT } from "../types";

const initAuthState = {
  isLogin: false,
  username: "",
  _id: "",
};

export function authReducer(state = initAuthState, action) {
  switch (action.type) {
    case LOGIN:
      return (state = {
        ...state,
        isLogin: true,
        username: action.payload.username,
        _id: action.payload._id,
      });
    case LOGOUT:
      return (state = {
        ...state,
        isLogin: false,
        username: "",
        _id: "",
      });

    default:
      return state;
  }
}
