import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MainLayout } from "../HOC/MainLayout";
import {
  Button,
  Grid,
  TextField,
  List,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@material-ui/core";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import PersonIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";
import { GenerateNewUser } from "../utils/generateNewUser";
import { authAction } from "../redux/actions/loginAction";
import { LOGIN } from "../redux/types";
import { useDispatch } from "react-redux";
import "../assets/css/register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [listUser, setIsUser] = useState([]);
  const route = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  function handleRegister(_id, username) {
    // already have accounts
    if (_id && !username) {
      const user = listUser.filter((item) => item._id === _id);
      dispatch(authAction(LOGIN, user[0]));
      localStorage.setItem("current_user", JSON.stringify([user[0]]));
      route.push("/");
      // don't have any account
    } else if (!_id && username) {
      const newUser = new GenerateNewUser(username);
      localStorage.setItem("auth_user", JSON.stringify([...listUser, newUser]));
      localStorage.setItem("current_user", JSON.stringify([newUser]));
      dispatch(authAction(LOGIN, newUser));
      route.push("/");
    } else {
      alert("🦄 please enter your username");
      console.log("routed 3");
    }
  }

  const deleteUser = (id) => {
    const result = listUser.filter((item) => item._id !== id);
    setIsUser(result);
    localStorage.setItem("auth_user", JSON.stringify(result));
  };

  useEffect(() => {
    const users = localStorage.getItem("auth_user");
    if (users) {
      const result = JSON.parse(users);
      setIsUser(result);
    }

    // clean up
    return () => {
      setIsUser([]);
    };
  }, []);

  return (
    <MainLayout title="Register">
      <Grid className="register">
        <Grid item className="box">
          <Grid
            container
            alignItems="flex-end"
            justifyContent="center"
            className="box-field"
          >
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="Username"
                onChange={handleChange}
              />
            </Grid>
            <Button
              variant="contained"
              color="inherit"
              endIcon={<KeyboardArrowRightIcon />}
              onClick={() => handleRegister(false, username)}
            >
              Go
            </Button>
          </Grid>
          {listUser.length > 0 && (
            <>
              <Grid className="divider">
                <Typography className="or-divider" variant="body2">
                  OR
                </Typography>
              </Grid>
              <List>
                {listUser.map((item) => {
                  return (
                    <ListItem
                      key={item._id}
                      onClick={() => handleRegister(item._id, false)}
                    >
                      <ListItemAvatar>
                        <PersonIcon />
                      </ListItemAvatar>
                      <ListItemText primary={item.username} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => deleteUser(item._id)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </>
          )}
        </Grid>
      </Grid>
    </MainLayout>
  );
}
