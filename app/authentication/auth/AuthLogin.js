"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { loginAdmin } from "/services/authenticationServices";
import { useDispatch, useSelector } from "react-redux";
import { login } from "/store/reducers/user";
import { useRouter } from "next/navigation";

const AuthLogin = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseTextColor, setResponseTextColor] = useState("red");

  const [response, setResponse] = useState({
    message: "",
    data: null,
  });

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const request = {
      username: username ?? "",
      password: password ?? "",
    };

    try {
      const response = await loginAdmin(request);
      setResponse(response);
      setResponseMessage("Đăng nhập thành công! Vui lòng kiểm tra email để xác minh!")
      setResponseTextColor("green")
    } catch (error) {
      console.error("Error :", error);
      setResponseMessage("Đăng nhập thất bại! Vui lòng kiểm tra tên đăng nhập và mật khẩu!")
    }
  };

  const onLoginSuccess = () => {
    response?.data && dispatch(login(response.data));
  };

  useEffect(() => {
    onLoginSuccess();
  }, [response]);

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
          <Typography htmlFor="username">Username</Typography>
          <TextField
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
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
        <Typography fontWeight="500" style={{ color: responseTextColor }}>{responseMessage}</Typography>

        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <Typography
            component={Link}
            href="/authentication/engineer-login"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Đăng nhập nhân viên
          </Typography>
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
      </Stack>
      {subtitle}
    </>
  );
};

export default AuthLogin;
