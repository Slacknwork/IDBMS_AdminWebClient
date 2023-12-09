"use client";

import { Box } from "@mui/material";

import Tabs from "/components/shared/Tabs";
import PageContainer from "/components/container/PageContainer";
import TabItems from "./tabItems";

const pageName = "Thông tin khu công trình";
const pageDescription = "Thông tin khu công trình";

export default function SiteDetailsLayout({ children }) {
  return (
    <PageContainer title={pageName} description={pageDescription}>
      <Tabs shadows uriPos={3} tabs={TabItems}></Tabs>
      <Box sx={{ mt: 3 }}>{children}</Box>
    </PageContainer>
  );
}
