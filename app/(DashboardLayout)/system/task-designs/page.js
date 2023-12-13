"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import AdminList from "/components/system/task-designs";
import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function TaskDesignsPage() {
  return (
    <PageContainer title="Danh sách thiết kế công việc" description="">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Typography color="text.primary">Danh sách thiết kế công việc</Typography>
      </Breadcrumbs>
      <DashboardCard title="Danh sách thiết kế công việc">
        <AdminList></AdminList>
      </DashboardCard>
    </PageContainer>
  );
}
