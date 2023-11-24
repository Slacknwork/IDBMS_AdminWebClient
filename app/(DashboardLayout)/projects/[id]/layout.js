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
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/projects">
          Danh sách dự án
        </Link>
        <Typography color="text.primary">Thông tin dự án</Typography>
      </Breadcrumbs>
      <DashboardCard title={projectName}>
        <Tabs uriPos={3} tabs={TabItems}></Tabs>
        {children}
      </DashboardCard>
    </PageContainer>
  );
}
