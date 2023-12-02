"use client";

import PageContainer from "/components/container/PageContainer";
import DashboardCard from "/components/shared/DashboardCard";

const pageTitle = "Tài liệu";

export default function ProjectTasks({ children }) {
  return (
    <PageContainer>
      <DashboardCard title={pageTitle}>{children}</DashboardCard>
    </PageContainer>
  );
}