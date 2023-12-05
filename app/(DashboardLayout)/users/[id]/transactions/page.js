"use client";

import TransactionList from "/components/transactions";
import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function DocumentsPage() {
  return (
    <PageContainer title="Danh sách dự án" description="">
      <DashboardCard title="Danh sách giao dịch">
        <TransactionList></TransactionList>
      </DashboardCard>
    </PageContainer>
  );
}
