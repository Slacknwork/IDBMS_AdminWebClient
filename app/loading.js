"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, CircularProgress, Typography } from "@mui/material";

import logo from "/public/images/logos/IDTco_Logo.jpg";

import PageContainer from "/components/container/PageContainer";

export default function Loading() {
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
        </Box>
      </Box>
    </PageContainer>
  );
}
