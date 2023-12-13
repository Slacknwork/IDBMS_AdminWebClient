"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import AdminList from "/components/system/task-categories";
import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function TaskCategoriesPage() {
  return (
    <PageContainer title="Danh sách phân loại công việc" description="">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Typography color="text.primary">Danh sách phân loại công việc</Typography>
      </Breadcrumbs>
      <DashboardCard title="Danh sách phân loại công việc">
        <AdminList></AdminList>
      </DashboardCard>
    </PageContainer>
  );
}
