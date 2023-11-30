"use client";

import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";
import Tabs from "/components/shared/Tabs";

import TabItems from "./tabItems";

const pageTitle = "Dự án";
const pageDescription =
  "Thông tin chi tiết của dự án & những tài liệu liên quan";

export default function ProjectsPage({ children }) {
  return (
    <PageContainer title={pageTitle} description={pageDescription}>
      <DashboardCard title={pageTitle}>
        <Tabs uriPos={3} tabs={TabItems}></Tabs>
        {children}
      </DashboardCard>
    </PageContainer>
  );
}
