"use client";

import PageContainer from "/components/container/PageContainer";
import DashboardCard from "/components/shared/DashboardCard";

const pageTitle = "Yêu cầu đang chờ duyệt";
const pageDescription = "Xem những yêu cầu đặt dự án từ khách hàng";

export default function Sites({ children }) {
  return (
    <PageContainer title={pageTitle} description={pageDescription}>
      <DashboardCard title={pageTitle}>{children}</DashboardCard>
    </PageContainer>
  );
}
