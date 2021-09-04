import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { MainLayout } from "../HOC/MainLayout";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { v4 as uuid } from "uuid";
import "../assets/css/home.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const route = useHistory();

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleRouteTo = () => {
    if (url) {
      const str = process.env.REACT_APP_CLIENT_URL + "/room";
      const result = url.slice(str.length + 1);
      route.push(`/room/${result}`);
    }
  };

  const handleRootRoom = () => {
    route.push(`/room/${uuid()}`);
  };

  return (
    <MainLayout title="Sola">
      <Grid
        className="home"
        container
        justifyContent="space-around"
        alignItems="center"
        maxwidth="lg"
      >
        <Grid className="overlay" />
        <Grid className="box-head" item lg={5} md={4} sm={10} xs={12}>
          <Typography variant="h2">Sola</Typography>
          <Typography variant="h3">All Friends One Room</Typography>
        </Grid>
        <Grid className="create-room" item lg={5} md={4} sm={10} xs={12}>
          <div className="btn-create-room">
            <Button
              onClick={handleRootRoom}
              justifycontent="center"
              alignitems="center"
            >
              <AddBoxIcon />
              Create Room
            </Button>
          </div>
          <Grid className="divider">
            <Typography className="or-divider" variant="body2">
              OR
            </Typography>
          </Grid>
          <div>
            <TextField
              id="outlined-full-width"
              label={"↗ URL Room"}
              placeholder="like https://sola.vercal.app/... etc.."
              helperText="paste url specific room"
              fullWidth
              margin="normal"
              justifycontent="center"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              className="text-url"
              onChange={handleChange}
            />

            <Button
              variant="contained"
              color="primary"
              endIcon={<ChevronRightIcon />}
              onClick={handleRouteTo}
            >
              Get Started
            </Button>
          </div>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
