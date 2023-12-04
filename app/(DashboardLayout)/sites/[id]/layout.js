"use client";

import Tabs from "/components/shared/Tabs";
import PageContainer from "/components/container/PageContainer";
import TabItems from "./tabItems";

const pageName = "Thông tin khu công trình";
const pageDescription = "Thông tin khu công trình";

export default function SiteDetails({ children }) {
  return (
    <PageContainer title={pageName} description={pageDescription}>
      <Tabs uriPos={3} tabs={TabItems}></Tabs>
      {children}
    </PageContainer>
  );
}
