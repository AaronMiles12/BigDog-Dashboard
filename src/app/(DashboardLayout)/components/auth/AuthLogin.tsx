"use client";
import React, { MouseEvent, TouchEventHandler } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  Input,
  Alert,
  AlertTitle,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "./login.style.module.scss";
import { SuccessData, useLoginMutation } from "@/store/apiSlice/auth";
import { setAuthenticated, setError, setStoreToken, setToken } from "@/store/slice/authSlice";
import { Margin, Visibility, VisibilityOff } from "@mui/icons-material";

interface loginType {
  title?: string;
  // subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title }: loginType) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  // const [errorMessage, setErrorMessage] = React.useState('');
  const { errorMessage, storeToken } = useAppSelector((state) => state.auth);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  let [loginMutation, { isLoading, error, data }] = useLoginMutation({});
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { error, data } = (await loginMutation({
        email,
        password,
      })) as {
        error: { success: false; message: string } | undefined;
        data: SuccessData | undefined;
      };
      if (error) {
        console.error("ERROR =>", error.message);
        if (error.message) {
          throw new Error(error.message);
        }
      } else if (data?.authToken && data?.refreshToken) {
        dispatch(setAuthenticated(true));
        dispatch(setStoreToken(storeToken));
        dispatch(setToken(data));
      }
    } catch (err: any) {
      console.error("ERROR =>", err.message);
      dispatch(setError(err.message));
    }
    // if (response.data?.token) {
    //   dispatch(setAuthenticated(true));
    // }
  };
  const handleAlertClose = () => {
    dispatch(setError(null)); // Clear the error message
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const rememberDevice = () => {
    dispatch(setStoreToken(!storeToken));
  };
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {isLoading && (
        <div className={styles.spinner}>
          <CircularProgress />
          <Typography
            variant="h3"
            fontWeight="600"
            color={"ButtonHighlight"}
            style={{
              marginTop: "16px",
            }}
          >
            Loading...
          </Typography>
        </div>
      )}

      {errorMessage && (
        <Alert
          severity="error"
          style={{ marginBottom: "16px" }}
          color={"error"}
          variant="filled"
          onClose={() => {
            handleAlertClose();
          }}
        >
          <AlertTitle style={{ padding: "0", margin: 0 }}>
            {" "}
            Error Logging In: {errorMessage}{" "}
          </AlertTitle>
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="email"
              ml="0.5rem"
            >
              EMAIL{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                *
              </span>
            </Typography>
            <Input
              type="email"
              fullWidth
              name="email"
              autoComplete="email"
              className={styles.inputLogin}
              placeholder="youremail@example.com"
              inputMode="email"
              onChange={handleChange}
            />
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              ml="0.5rem"
            >
              PASSWORD{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                *
              </span>
            </Typography>
            <Input
              type={showPassword ? "text" : "password"}
              fullWidth
              name="password"
              autoComplete="password"
              className={styles.inputLogin}
              placeholder="********"
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    onMouseDown={handleShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked onClick={rememberDevice} />}
                label="Remember this Device"
              />
            </FormGroup>
          </Stack>
        </Stack>
        <Box>
          <Button color="primary" variant="contained" size="large" fullWidth type="submit">
            Sign In
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AuthLogin;
