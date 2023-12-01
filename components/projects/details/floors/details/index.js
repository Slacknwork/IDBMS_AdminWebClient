"use client";

import PageContainer from "/components/container/PageContainer";
import Tabs from "/components/shared/Tabs";

import TabItems from "./tabItems";

export default function ProjectFloors({ children }) {
  return (
    <PageContainer title="Chi tiết tầng">
      <Tabs uriPos={5} tabs={TabItems}></Tabs>
      {children}
    </PageContainer>
  );
}
