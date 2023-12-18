"use client";

import { Box, Typography } from "@mui/material";
import PageContainer from "/components/container/PageContainer";

export default function TaskCategoriesLayout({ children }) {
  return (
    <PageContainer title="Phân loại công việc" description="Danh sách các Phân loại công việc">
      <Typography variant="h2">Phân loại công việc</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
