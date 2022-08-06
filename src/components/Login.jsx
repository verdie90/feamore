import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Stack,
  Alert,
  Box,
  CircularProgress,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);
  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login Amoresoft
        </Typography>
        <Box component='form' onSubmit={Auth} noValidate sx={{ mt: 1 }}>
          {isError && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant='outlined' severity='error'>
                {message}
              </Alert>
            </Stack>
          )}
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            autoFocus
          />

          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Ingat saya'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            {isLoading ? <CircularProgress color='inherit' /> : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Lupa Password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
