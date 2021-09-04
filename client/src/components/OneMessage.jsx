import React from "react";
import { Grid, Typography } from "@material-ui/core";

export function OneMessage({ currentUser, from, content, id }) {
  return (
    <React.Fragment key={id}>
      <Grid
        item
        className={from === currentUser ? "one-message from" : "one-message to"}
      >
        <Typography variant="body2"> {content} </Typography>
      </Grid>
    </React.Fragment>
  );
}
