import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  FormControl,
  Button,
  Stack,
  Checkbox,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { loginByGoogle } from "/api/authenticationServices";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "/store/reducers/user";
import { useRouter } from "next/navigation";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {

    const request = {
      email: event.profileObj.email ?? "",
      googleToken: gapi.auth.getToken().access_token ?? "",
    };
    try {
      const response = await loginByGoogle(request);
      console.log(response);
      toast.success("Đăng nhập thành công!");
      dispatch(login(response.data));

      router.push(`/sites`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Email không hợp lệ!");
    }
  };

  const responseGoogle = (response) => {
    var token = gapi.auth.getToken().access_token;
    console.log(token);
    console.log(response.profileObj.email);
    toast.success("Đăng nhập thành công!");
    router.push(`http://localhost:3000`);
  };
  const errorResponseGoogle = (response) => {
    console.log(response);
    toast.error("Đăng nhập thất bại!");
  };

  useEffect(() =>{
    function start(){
      gapi.client.init({
        clientId: "982175343540-ocj3fml5872ctrnittr7ljfupcu2crb8.apps.googleusercontent.com",
        scope:""
      })
    };
    gapi.load("client:auth2", start);
  });

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack component="form" onSubmit={handleFormSubmit}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <Typography htmlFor="email">Email</Typography>
          <TextField
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <Typography htmlFor="password">Mật khẩu</Typography>
          <TextField
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>

        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Quên mật khẩu?
          </Typography>
        </Stack>

        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Đăng nhập
          </Button>
        </Box>

        <Box>
          <GoogleLogin
          clientId="982175343540-ocj3fml5872ctrnittr7ljfupcu2crb8.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={handleFormSubmit}
          onFailure={errorResponseGoogle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          />
        </Box>
      </Stack>
      {subtitle}
    </>
  );
};

export default AuthLogin;
