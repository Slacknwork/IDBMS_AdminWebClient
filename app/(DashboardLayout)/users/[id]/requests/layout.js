"use client";

import { Box } from "@mui/material";

import DashboardCard from "/components/shared/DashboardCard";
import Tabs from "/components/shared/Tabs";
import TabItems from "./tabItems";

export default function UserRequestsLayout({ children }) {
  return (
    <DashboardCard title="Yêu cầu">
      <Tabs uriPos={4} tabs={TabItems}></Tabs>
      {children}
    </DashboardCard>
  );
}
