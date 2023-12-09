"use client";

import { Box, Typography } from "@mui/material";

import PageContainer from "/components/container/PageContainer";

export default function ItemsLayout({ children }) {
  return (
    <PageContainer>
      <Typography variant="h2">Sản phẩm nội thất</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
