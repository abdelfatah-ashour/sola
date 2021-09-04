import { authAction } from "../redux/actions/loginAction";
import { LOGIN, LOGOUT } from "../redux/types";

export const getUser = () => {
  return localStorage.getItem("auth_user");
};

export function checkIsUser(dispatch) {
  const GET_USER = localStorage.getItem("current_user");

  if (GET_USER) {
    const parse = JSON.parse(GET_USER);
    if (parse.length > 0) {
      dispatch(authAction(LOGIN, parse[0]));
    } else {
      dispatch(authAction(LOGOUT));
    }
  } else {
    localStorage.setItem("current_user", JSON.stringify([]));
    dispatch(authAction(LOGOUT));
  }
}
