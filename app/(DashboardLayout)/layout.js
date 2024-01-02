"use client";

import {
  styled,
  Container,
  Box,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Header from "/components/layout/header/Header";
import Sidebar from "/components/layout/sidebar";

import "react-toastify/dist/ReactToastify.css";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export default function RootLayout({ children }) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user?.loggedIn) {
      router.push("/authentication/login");
    }
  }, [router, user]);

  return (
    <MainWrapper className="mainwrapper">
      <Sidebar
        isSidebarOpen={sidebarOpen}
        isMobileSidebarOpen={mobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper className="page-wrapper">
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
              <Link underline="hover" color="inherit" href="/">
                Trang chủ
              </Link>
              <Typography color="text.primary">Khu công trình</Typography>
            </Breadcrumbs>
            {children}
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
