"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import AdminList from "/components/system/project-designs";
import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function ProjectDesignPage() {
  return (
    <PageContainer title="Danh sách thiết kế dự án" description="">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Typography color="text.primary">Danh sách thiết kế dự án</Typography>
      </Breadcrumbs>
      <DashboardCard title="Danh sách thiết kế dự án">
        <AdminList></AdminList>
      </DashboardCard>
    </PageContainer>
  );
}
