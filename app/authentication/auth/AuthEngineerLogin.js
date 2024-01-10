"use client";

import { useEffect, useState } from "react";
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
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
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
        toast.success("Đăng nhập thành công!");
        dispatch(login(response));
        router.push("/");
      } else toast.error("Tài khoản không có quyền truy cập!");
    } catch (error) {
      console.error("Error :", error);
      toast.error("Email không hợp lệ!");
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
      toast.error("Lỗi đăng nhập Google!");
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
          <Button
            color="primary"
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
