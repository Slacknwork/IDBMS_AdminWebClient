"use client";

import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function ProjectsPage({ children }) {
  return (
    <PageContainer
      title="Dự án"
      description="Thông tin chi tiết của dự án & những tài liệu liên quan"
    >
      {children}
    </PageContainer>
  );
}
