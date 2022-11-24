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
import { Link } from "react-router-dom";

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
    forgotPassword: {
      margin: "10px 0px",
      textAlign: "right",
    },
  })
);

const Login = () => {
  const classes = useStyles();

  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState("false");

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
          Login
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

          <FormControl
            required
            fullWidth
            marginTop={2}
            marginBottom={4}
            sx={{ m: 1 }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setShowPassword((prevshowPassword) => !prevshowPassword)
                    }
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              required
              label="Password"
            />
          </FormControl>

          <Button variant="contained" n sx={{ m: 1 }} fullWidth type="submit">
            Login
          </Button>
        </Box>

        <div>
          <Link to="/forgotpassword" className={classes.forgotPassword}>
            forgot password?
          </Link>

          <Typography variant="subtitle1">Not Registerd Yet?</Typography>

          <Link to="/register" className={classes.forgotPassword}>
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
