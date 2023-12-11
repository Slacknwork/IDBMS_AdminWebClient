"use client";

import { Box, Typography } from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import Tabs from "/components/shared/Tabs";
import TabItems from "./tabItems";

export default function RequestsLayout({ children }) {
  return (
    <PageContainer
      title="Yêu cầu"
      description="Xem những yêu cầu đặt dự án từ khách hàng"
    >
      <Typography variant="h2">Yêu cầu</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Tabs shadows uriPos={2} tabs={TabItems}></Tabs>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
