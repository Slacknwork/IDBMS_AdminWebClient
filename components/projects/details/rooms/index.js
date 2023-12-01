"use client";

import PageContainer from "/components/container/PageContainer";
import Tabs from "/components/shared/Tabs";
import DashboardCard from "/components/shared/DashboardCard";

import TabItems from "./tabItems";

export default function ProjectFloors({ children }) {
  return (
    <PageContainer title="Chi tiết phòng">
      <DashboardCard title="Phòng">
        <Tabs uriPos={5} tabs={TabItems}></Tabs>
        {children}
      </DashboardCard>
    </PageContainer>
  );
}
