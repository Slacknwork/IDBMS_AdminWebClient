"use client";

import PageContainer from "/components/container/PageContainer";
import DashboardCard from "/components/shared/DashboardCard";

const pageTitle = "Khu công trình";
const pageDescription = "Danh sách các khu công trình";

export default function Sites({ children }) {
  return (
    <PageContainer title={pageTitle} description={pageDescription}>
      <DashboardCard title={pageTitle}>{children}</DashboardCard>
    </PageContainer>
  );
}
