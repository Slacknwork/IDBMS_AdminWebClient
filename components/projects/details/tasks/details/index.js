"use client";

import PageContainer from "/components/container/PageContainer";
import Tabs from "/components/shared/Tabs";

import TabItems from "./tabItems";

export default function TaskDetails({ children }) {
  return (
    <PageContainer title="Chi tiết công việc">
      <Tabs indicatorColor="white" uriPos={5} tabs={TabItems}></Tabs>
      {children}
    </PageContainer>
  );
}
