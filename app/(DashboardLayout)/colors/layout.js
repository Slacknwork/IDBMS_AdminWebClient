"use client";

import { Box, Typography } from "@mui/material";
import PageContainer from "/components/container/PageContainer";

export default function ItemColorsLayout({ children }) {
  return (
    <PageContainer
      title="Danh sách màu sản phẩm"
      description="Danh sách màu sản phẩm"
    >
      <Typography variant="h2">Màu sản phẩm</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}