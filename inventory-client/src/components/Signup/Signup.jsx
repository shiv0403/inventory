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

const Register = () => {
  const classes = useStyles();

  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState("false");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showConfirmPassword, setShowConfirmPassword] = React.useState("false");

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
          Register
        </Typography>
        <Box
          marginTop={5}
          component="form"
          className={classes.form}
          autoComplete="off"
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

          <FormControl
            required
            fullWidth
            marginTop={2}
            marginBottom={4}
            sx={{ m: 1 }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-confirm-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prevshowPassword) => !prevshowPassword
                      )
                    }
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              required
              label="Confirm Password"
            />
          </FormControl>

          <Button variant="contained" n sx={{ m: 1 }} fullWidth type="submit">
            Register
          </Button>
        </Box>
      </div>
    </>
  );
};

export default Register;
