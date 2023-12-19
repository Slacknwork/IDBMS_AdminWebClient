"use client";

import { Box, Typography } from "@mui/material";
import PageContainer from "/components/container/PageContainer";

export default function ItemColorsLayout({ children }) {
  return (
    <PageContainer
      title="Danh sách màu"
      description="Danh sách các danh màu"
    >
      <Typography variant="h2">Danh sách danh màu</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}