import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { green } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { signUp } from "../../redux/reducers/authSlice";
import { useHistory } from "react-router";
import { useTitle } from "../../Hooks/useTitle";
import uwcssa_logo from "../../static/uwcssa_logo.svg";

const useStyles = makeStyles(() => ({
  alert: {
    marginTop: "1.5rem",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  useTitle("UWCSSA注册帐号");
  const dispatch = useDispatch();
  const history = useHistory();
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const timer = useRef();

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const { isAuthenticated } = useSelector((state) => state.userAuth);

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const onSubmit = async (data) => {
    setLoadingState(true);
    const response = await dispatch(signUp(data));
    console.log("onSignUp", response);
    if (response.meta.requestStatus === "fulfilled") {
      history.push(`/auth/emailConfirm/${getValues("username")}`);
    } else {
      timer.current = window.setTimeout(() => {
        setLoadingState(false);
        setAlertContent(response.error.message);
        setAlert(true);
        console.log(response.error.message);
      }, 1000);

      console.log(response.error.message);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ mb: "2rem" }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={uwcssa_logo}
          alt="uwcssaLogo"
          style={{ margin: "1rem", height: "50px" }}
        />

        <Typography variant="h5">注册</Typography>
        <Typography>
          已经有账户了？
          <Link to="/auth/signIn">登入</Link>
        </Typography>
        {alert ? (
          <Alert className={classes.alert} severity="error">
            {alertContent}
          </Alert>
        ) : (
          <></>
        )}
        <Box
          component="form"
          noValidate
          sx={{ my: 4 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ my: 1 }}>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    required
                    label="用户名"
                    variant="outlined"
                    fullWidth
                    autoComplete="username"
                    onChange={onChange}
                    value={value}
                    error={!!errors.username}
                    helperText={errors.username ? "不能为空" : null}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ my: 1 }}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    required
                    label="邮箱"
                    variant="outlined"
                    fullWidth
                    autoComplete="email"
                    onChange={onChange}
                    value={value}
                    error={!!errors.email}
                    helperText={errors.email ? "邮箱格式不对" : null}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sx={{ my: 1 }}>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      密码
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      type={isShowPassword ? "text" : "password"}
                      onChange={onChange}
                      error={!!errors.password}
                      helperText={errors.username ? "不能为空" : null}
                      value={value}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {isShowPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            disabled={loadingState}
            sx={{ my: 4 }}
          >
            注册
            {loadingState && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-0.75rem",
                  marginLeft: "-0.75rem",
                }}
              />
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
