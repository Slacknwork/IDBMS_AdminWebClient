"use client";

import PageContainer from "/components/container/PageContainer";
import DashboardCard from "/components/shared/DashboardCard";
import Tabs from "/components/shared/Tabs";
import TabItems from "./tabItems";

const pageTitle = "Thanh toán";

export default function ProjectTasks({ children }) {
  return (
    <PageContainer>
      <DashboardCard title={pageTitle}>
        <Tabs uriPos={4} tabs={TabItems}></Tabs>
        {children}
      </DashboardCard>
    </PageContainer>
  );
}
