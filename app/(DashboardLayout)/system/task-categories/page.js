"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import AdminList from "/components/system/task-categories";
import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function UsersPage() {
  return (
    <PageContainer title="Danh sách quản lý" description="">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Typography color="text.primary">Danh sách quản lý</Typography>
      </Breadcrumbs>
      <DashboardCard title="Danh sách quản lý">
        <AdminList></AdminList>
      </DashboardCard>
    </PageContainer>
  );
}
