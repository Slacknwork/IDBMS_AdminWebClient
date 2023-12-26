"use client";

import { Box, Typography } from "@mui/material";
import PageContainer from "/components/container/PageContainer";

export default function PaymentStageDesignsLayout({ children }) {
  return (
    <PageContainer
      title="Danh mục thiết kế giai đoạn thanh toán"
      description="Danh sách các thiết kế giai đoạn thanh toán"
    >
      <Typography variant="h2">Thiết kế giai đoạn thanh toán</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
