"use client";

import { Box, Typography } from "@mui/material";

import PageContainer from "/components/container/PageContainer";

export default function TransactionsLayout({ children }) {
  return (
    <PageContainer>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box>{children}</Box>
      </Box>
    </PageContainer>
  );
}
