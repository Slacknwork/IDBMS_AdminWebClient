"use client";

import { Box, Typography } from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import Tabs from "/components/shared/Tabs";

import TabItems from "./tabItems";

export default function ProjectDetails({ children }) {
  return (
    <PageContainer>
      <Typography variant="h2">Dự án</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Tabs shadows uriPos={3} tabs={TabItems}></Tabs>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
