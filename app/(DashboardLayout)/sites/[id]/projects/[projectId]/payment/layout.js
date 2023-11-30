"use client";

import { Box } from "@mui/material";

import DashboardCard from "/components/shared/DashboardCard";
import Tabs from "/components/shared/Tabs";
import TabItems from "./tabItems";

export default function ClientLayout({ children }) {
  return (
    <Box sx={{ mt: 2 }}>
      <DashboardCard title={"Thanh toán"}>
        <Tabs uriPos={4} tabs={TabItems}></Tabs>
        {children}
      </DashboardCard>
    </Box>
  );
}
