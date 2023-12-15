"use client";

import { Box } from "@mui/material";

import Tabs from "/components/shared/Tabs";
import PageContainer from "/components/container/PageContainer";
import TabItems from "./tabItems";

export default function AdvertisementDetailsLayout({ children }) {
  return (
    <PageContainer title="Quảng cáo dự án" description="Quảng cáo dự án">
      <Tabs shadows uriPos={3} tabs={TabItems}></Tabs>
      <Box sx={{ mt: 3 }}>{children}</Box>
    </PageContainer>
  );
}
