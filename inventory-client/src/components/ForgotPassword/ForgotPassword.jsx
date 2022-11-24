import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Button,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    heading: {},
    form: {
      width: "35%",
    },
  })
);

const ForgotPassword = () => {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Typography
          variant="h2"
          marginTop={5}
          guttersBottom
          component="h2"
          className={classes.heading}
        >
          Forgot Password
        </Typography>
        <Box
          marginTop={5}
          component="form"
          className={classes.form}
          autoComplete="off"
          marginBottom={5}
        >
          <FormControl required fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              label="Email"
              required
              value={email}
              onchange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <Button variant="contained" n sx={{ m: 1 }} fullWidth type="submit">
            Forgot Password
          </Button>
        </Box>
      </div>
    </>
  );
};

export default ForgotPassword;
