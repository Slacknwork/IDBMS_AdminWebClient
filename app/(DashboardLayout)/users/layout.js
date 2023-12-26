"use client";

import { Box, Typography } from "@mui/material";
import PageContainer from "/components/container/PageContainer";

export default function UsersLayout({ children }) {
  return (
    <PageContainer
      title="Danh sách Người dùng"
      description="Danh sách Người dùng"
    >
      <Typography variant="h2">Người dùng</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
