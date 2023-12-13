"use client";

import { Box, Typography } from "@mui/material";
import PageContainer from "/components/container/PageContainer";

export default function AdvertisementLayout({ children }) {
  return (
    <PageContainer
      title="Quảng cáo"
      description="Danh sách các dự án được dùng để quảng cáo"
    >
      <Typography variant="h2">Quảng cáo</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
