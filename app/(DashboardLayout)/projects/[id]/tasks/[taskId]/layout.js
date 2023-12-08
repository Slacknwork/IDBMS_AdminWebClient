"use client";

import { Box } from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import Tabs from "/components/shared/Tabs";

import TabItems from "./tabItems";

export default function TaskDetailsLayout({ children }) {
  return (
    <PageContainer title="Chi tiết công việc">
      <Tabs
        borderColor="white"
        indicatorColor="white"
        uriPos={5}
        tabs={TabItems}
      ></Tabs>
      <Box sx={{ mt: 2 }}>{children}</Box>
    </PageContainer>
  );
}
