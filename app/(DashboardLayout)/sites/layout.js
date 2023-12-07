"use client";

import PageContainer from "/components/container/PageContainer";
import DashboardCard from "/components/shared/DashboardCard";

export default function SitesLayout({ children }) {
  return (
    <PageContainer
      title="Khu công trình"
      description="Danh sách các khu công trình"
    >
      <DashboardCard sx={{ minHeight: "32rem" }} title="Khu công trình">
        {children}
      </DashboardCard>
    </PageContainer>
  );
}
