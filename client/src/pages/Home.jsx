import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography, Button, TextField, Box } from "@material-ui/core";
import { MainLayout } from "../HOC/MainLayout";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { v4 as uuid } from "uuid";
import "../assets/css/home.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const route = useHistory();

  const handleChange = e => {
    setUrl(e.target.value);
  };

  const handleRouteTo = () => {
    if (url) {
      const str = process.env.REACT_APP_CLIENT_URL + "/room";
      const result = url.slice(str.length + 1);
      window.location.href = `/room/${result}`;
    } else {
      alert("URL is required!");
    }
  };

  const handleRootRoom = () => {
    route.push(`/room/${uuid()}`);
  };

  return (
    <MainLayout title="Sola">
      <Grid className="home" container justifyContent="center" alignItems="center">
        <Grid className="create-room" item lg={4} md={4} sm={6} xs={10}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={handleRootRoom}
            padding={1}
            sx={{
              cursor: "pointer",
            }}>
            <AddBoxIcon />
            <Typography fontSize={20} fontWeight="900">
              Create Room
            </Typography>
          </Box>
          <Grid className="divider">
            <Typography className="or-divider" variant="caption">
              OR
            </Typography>
          </Grid>
          <TextField
            id="outlined-full-width"
            label={"↗ URL Room"}
            placeholder="like https://sola.vercal.app/... etc.."
            helperText="paste url specific room"
            fullWidth
            margin="normal"
            justifyContent="center"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            className="text-url"
            onChange={handleChange}
          />

          <Button variant="contained" endIcon={<ChevronRightIcon />} onClick={handleRouteTo}>
            Get Started
          </Button>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
