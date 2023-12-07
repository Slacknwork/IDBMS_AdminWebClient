"use client";

import { Box } from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import Tabs from "/components/shared/Tabs";

import TabItems from "./tabItems";

export default function ProjectDetails({ children }) {
  return (
    <PageContainer>
      <Tabs uriPos={3} tabs={TabItems}></Tabs>
      <Box sx={{ mt: 3 }}>{children}</Box>
    </PageContainer>
  );
}
