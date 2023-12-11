"use client";

import { Box, Typography } from "@mui/material";
import PageContainer from "/components/container/PageContainer";

export default function SitesLayout({ children }) {
  return (
    <PageContainer
      title="Khu công trình"
      description="Danh sách các khu công trình"
    >
      <Typography variant="h2">Khu công trình</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
