"use client";

import { Box, Typography } from "@mui/material";

import PageContainer from "/components/container/PageContainer";

export default function RequestsLayout({ children }) {
  return (
    <PageContainer
      title="Yêu cầu"
      description="Xem những yêu cầu đặt dự án từ khách hàng"
    >
      <Typography variant="h2">Yêu cầu</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
