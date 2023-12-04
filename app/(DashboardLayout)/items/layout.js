"use client";

import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function ItemsLayout({ children }) {
  return (
    <PageContainer title="Danh sách sản phẩm" description="">
      <DashboardCard title="Danh sách sản phẩm">{children}</DashboardCard>
    </PageContainer>
  );
}
