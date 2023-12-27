"use client";

import { Box, Typography } from "@mui/material";
import PageContainer from "/components/container/PageContainer";

export default function ProjectDesignsLayout({ children }) {
  return (
    <PageContainer
      title="Thiết kế dự án"
      description="Danh sách các thiết kế dự án"
    >
      <Typography variant="h2">Thiết kế dự án</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
