"use client";

import { Box, Typography } from "@mui/material";
import PageContainer from "/components/container/PageContainer";

export default function ProjectCategoriesLayout({ children }) {
  return (
    <PageContainer
      title="Danh mục dự án"
      description="Danh sách các danh mục dự án"
    >
      <Typography variant="h2">Danh sách danh mục dự án</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
