"use client";

import PageContainer from "/components/container/PageContainer";
import DashboardCard from "/components/shared/DashboardCard";

const pageTitle = "Công việc";

export default function TasksLayout({ children }) {
  return (
    <PageContainer>
      <DashboardCard title={pageTitle}>{children}</DashboardCard>
    </PageContainer>
  );
}
