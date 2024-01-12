"use client";

import {
  Container,
  Box,
  IconButton,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter, usePathname } from "next/navigation";
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
  const theme = useTheme();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const user = useSelector((state) => state.user);
  if (!(user && user?.loggedIn)) {
    router.push("/authentication/login");
  }

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
          <Box>
            {pathname !== "/" && (
              <IconButton
                sx={{
                  px: 0,
                  pt: 0,
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor: "white",
                  },
                  transition: "color 0.2s",
                }}
                onClick={handleBack}
              >
                <ChevronLeftIcon />
                <Typography variant="body1">Quay về</Typography>
              </IconButton>
            )}

            {children}
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
