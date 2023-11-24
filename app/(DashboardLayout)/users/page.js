"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import UserList from "/components/users";
import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function UsersPage() {
  return (
    <PageContainer title="Danh sách người dùng" description="">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Typography color="text.primary">Danh sách người dùng</Typography>
      </Breadcrumbs>
      <DashboardCard title="Danh sách người dùng">
        <UserList></UserList>
      </DashboardCard>
    </PageContainer>
  );
}
