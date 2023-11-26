"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import ProjectList from "/components/items/categories/List";
import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function ProjectsPage() {
  return (
    <PageContainer title="Danh sách dự án" description="">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Typography color="text.primary">Danh sách dự án</Typography>
      </Breadcrumbs>
      <DashboardCard title="Danh sách dự án">
        <ProjectList></ProjectList>
      </DashboardCard>
    </PageContainer>
  );
}
