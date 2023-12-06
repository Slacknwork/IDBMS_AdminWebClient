"use client";

import { Box } from "@mui/material";

import DashboardCard from "/components/shared/DashboardCard";
import Tabs from "/components/shared/Tabs";
import TabItems from "./tabItems";

export default function UserDetailsLayout({ children }) {
  return (
    <Box>
      <Tabs uriPos={3} tabs={TabItems}></Tabs>
      {children}
    </Box>
  );
}
