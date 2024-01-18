"use client";

import { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  FormControl,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { login } from "/store/reducers/user";

import { companyRoleConstants } from "/constants/enums/companyRole";

import { loginUser } from "/services/authenticationServices";

const AuthLogin = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseTextColor, setResponseTextColor] = useState("red");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const request = {
      email: email ?? "",
      password: password ?? "",
    };
    try {
      const response = await loginUser(request);
      if (
        response.role === companyRoleConstants.ARCHITECT ||
        response.role === companyRoleConstants.CONSTRUCTION_MANAGER
      ) {
        dispatch(login(response));
        router.push("/");
      } else {
        setResponseMessage(
          "Tài khoản này không được phép đăng nhập vào hệ thống!"
        );
      }
    } catch (error) {
      console.error("Error :", error);
      setResponseMessage(
        "Đăng nhập thất bại! Vui lòng kiểm tra tên đăng nhập và mật khẩu!"
      );
    }
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/authentication/google" });
  };

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
          <Typography>Email</Typography>
          <TextField
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <Typography>Mật khẩu</Typography>
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
          <Typography
            component={Link}
            href="/authentication/login"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Đăng nhập QTV
          </Typography>
        </Stack>

        {!loading && (
          <Typography fontWeight="500" style={{ color: responseTextColor }}>
            {responseMessage}
          </Typography>
        )}

        <Box sx={{ my: 2 }}>
          <Button
            disabled={loading}
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            {loading ? (
              <Stack>
                <CircularProgress
                  style={{ color: "gray" }}
                  size={32}
                  thickness={5}
                ></CircularProgress>
              </Stack>
            ) : (
              <>Đăng nhập</>
            )}
          </Button>
          <Typography sx={{ my: 2, textAlign: "center" }} variant="subtitle2">
            Hoặc
          </Typography>
          <Button
            startIcon={<GoogleIcon />}
            color="error"
            variant="contained"
            size="large"
            onClick={handleGoogleLogin}
            fullWidth
          >
            Đăng nhập bằng Google
          </Button>
        </Box>
      </Stack>
      {subtitle}
    </>
  );
};

export default AuthLogin;
