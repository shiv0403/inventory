import { CssBaseline, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

const VerifyEmail = () => {
  const classes = useStyles();

  const token = useLocation()
    .search.slice(0, useLocation().search.length)
    .split("=")
    .pop();

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState();

  if (!token) {
    return <p>Token not Present</p>;
  }

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Typography variant="h2" marginTop={5} guttersBottom component="h2">
          {verified && !error
            ? "You are verified"
            : error
            ? error
            : "Verifying please wait"}
        </Typography>
      </div>
    </>
  );
};

export default VerifyEmail;
