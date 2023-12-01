"use client";

import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

import PageContainer from "/components/container/PageContainer";
import DashboardCard from "/components/shared/DashboardCard";

const pageTitle = "Danh sách công việc";

export default function ProjectTasks({ children }) {
  // TABS
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <PageContainer>
      <DashboardCard title={pageTitle}>
        {/* Tabs */}
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Stage 1" />
          <Tab label="Stage 2" />
        </Tabs>
        {children}
      </DashboardCard>
    </PageContainer>
  );
}
