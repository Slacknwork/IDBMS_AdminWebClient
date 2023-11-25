"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import DashboardCard from "/components/shared/DashboardCard";
import Tabs from "/components/shared/Tabs";
import PageContainer from "/components/container/PageContainer";

import TabItems from "./tabItems";

export default function ClientLayout({ children }) {
  const projectName = "Tên dự án";
  return (
    <PageContainer title={projectName}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link href="/">
          <Typography>Trang chủ</Typography>
        </Link>
        <Link href="/projects">
          <Typography>Dự án</Typography>
        </Link>
        <Typography variant="subtitle2" fontWeight={600}>
          Thông tin dự án
        </Typography>
      </Breadcrumbs>
      <DashboardCard title={projectName}>
        <Tabs uriPos={3} tabs={TabItems}></Tabs>
        {children}
      </DashboardCard>
    </PageContainer>
  );
}
