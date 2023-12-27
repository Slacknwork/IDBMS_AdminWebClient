"use client";

import { Box, Typography } from "@mui/material";
import PageContainer from "/components/container/PageContainer";

export default function TaskDesignsLayout({ children }) {
  return (
    <PageContainer
      title="thiết kế công việc"
      description="Danh sách các thiết kế công việc"
    >
      <Typography variant="h2">Thiết kế công việc</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
