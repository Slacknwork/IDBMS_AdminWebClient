"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "/store/reducers/user";

import logo from "/public/images/logos/IDTco_Logo.jpg";

import { adminConfirmVerify } from "/services/authenticationServices";

import PageContainer from "/components/container/PageContainer";

export default function AdminConfirmVerify() {
  const codeQuery = "code";
  const emailQuery = "email";

  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const onEnterPage = async () => {
    try {
      const code = searchParams.get(codeQuery) ?? "";
      const email = searchParams.get(emailQuery) ?? "";
      const response = await adminConfirmVerify({ code, email });
      dispatch(login({ token: response }));
      router.push("/");
    } catch (error) {}
  };

  useEffect(() => {
    onEnterPage();
  }, []);

  return (
    <PageContainer title="Đăng nhập bằng Google">
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "aliceblue",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            sx={{ my: "auto", mx: "auto" }}
            size={150}
            thickness={2}
          ></CircularProgress>
          <Image
            src={logo}
            alt="IDT"
            width={75}
            height={75}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              // add more styling as needed
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Đang đăng nhập tài khoản Quản trị viên...
            </Typography>
            <Typography variant="p">
              <Link href="/authentication/engineer-login">Click vào đây</Link>{" "}
              để trở về màn hình Đăng nhập
            </Typography>
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
}
