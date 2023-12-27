"use client";

import { Box, Typography } from "@mui/material";

import PageContainer from "/components/container/PageContainer";

export default function AdminsLayout({ children }) {
  return (
    <PageContainer>
      <Typography variant="h2">Quản lý</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
