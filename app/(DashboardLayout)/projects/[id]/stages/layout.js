"use client";

import PageContainer from "/components/container/PageContainer";
import DashboardCard from "/components/shared/DashboardCard";

export default function StagesLayout({ children }) {
  return (
    <PageContainer>
      <DashboardCard>{children}</DashboardCard>
    </PageContainer>
  );
}
