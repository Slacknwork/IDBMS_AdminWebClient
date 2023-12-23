"use client";

import { Box, Typography } from "@mui/material";

import PageContainer from "/components/container/PageContainer";

export default function DocumentsLayout({ children }) {
  return (
    <PageContainer>
      <Typography variant="h2">Danh sách tài liệu</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
