"use client";

import { Box, Typography } from "@mui/material";
import PageContainer from "/components/container/PageContainer";

export default function ItemCategoriesLayout({ children }) {
  return (
    <PageContainer
      title="Danh sách phân loại sản phẩm"
      description="Danh sách các phân loại sản phẩm"
    >
      <Typography variant="h2">Danh sách phân loại sản phẩm</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}