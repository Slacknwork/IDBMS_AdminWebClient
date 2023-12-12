"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import AdminList from "/components/system/project-categories";
import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function ProjectCategoriesPage() {
  return (
    <PageContainer title="Danh sách phân loại dự án" description="">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Typography color="text.primary">Danh sách phân loại dự án</Typography>
      </Breadcrumbs>
      <DashboardCard title="Danh sách phân loại dự án">
        <AdminList></AdminList>
      </DashboardCard>
    </PageContainer>
  );
}
