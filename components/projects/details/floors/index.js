"use client";

import PageContainer from "/components/container/PageContainer";
import DashboardCard from "/components/shared/DashboardCard";

const pageTitle = "Tầng";

export default function ProjectFloors({ children }) {
  return (
    <PageContainer>
      <DashboardCard title={pageTitle}>{children}</DashboardCard>
    </PageContainer>
  );
}
