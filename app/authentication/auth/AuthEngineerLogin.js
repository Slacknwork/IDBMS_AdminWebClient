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
import GoogleIcon from "@mui/icons-material/Google";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { login } from "/store/reducers/user";

import { companyRoleConstants } from "/constants/enums/companyRole";

import { loginUser, loginByGoogle } from "/services/authenticationServices";

const AuthLogin = ({ title, subtitle, subtext }) => {
  const session = useSession();
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
    event.preventDefault();
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
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google");
  };

  const googleLoginServer = async () => {
    try {
      const googleToken = session?.data?.id_token;
      const response = await loginByGoogle({ googleToken });
      dispatch(login(response));
      router.push("/");
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    if (session?.data?.id_token) {
      console.log("ok");
      googleLoginServer();
    }
  }, [session]);

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
