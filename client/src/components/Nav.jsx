import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import { checkIsUser } from "../utils/authUser";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../redux/actions/loginAction";
import { LOGOUT } from "../redux/types";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import "../assets/css/nav.css";

export default function ButtonAppBar() {
  const { Auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authAction(LOGOUT));
    localStorage.setItem("current_user", JSON.stringify([]));
  };

  useEffect(() => {
    checkIsUser(dispatch);
    return () => {};
  }, [dispatch]);

  return (
    <Grid container maxwidth="md" className="nav">
      <Grid item className="nav-box">
        <Grid className="menu-list">
          <Link to="/" area-aria-label="home page">
            <Home /> Home
          </Link>
        </Grid>

        {!Auth.isLogin && (
          <Link to="/register" aria-label="register page">
            <AddIcon /> Register
          </Link>
        )}

        {Auth.isLogin && (
          <Link to="/" aria-label="register page" onClick={handleLogout}>
            <ExitToAppIcon /> LOGOUT
          </Link>
        )}
      </Grid>
    </Grid>
  );
}
