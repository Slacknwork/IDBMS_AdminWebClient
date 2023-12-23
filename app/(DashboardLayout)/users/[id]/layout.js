"use client";

import { Box, Typography } from "@mui/material";
import PageContainer from "/components/container/PageContainer";

export default function UserDetailsLayout({ children }) {
  return (
    <PageContainer title="Người dùng" description="Danh sách người dùng">
      <Typography variant="h2">Loại phòng</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
