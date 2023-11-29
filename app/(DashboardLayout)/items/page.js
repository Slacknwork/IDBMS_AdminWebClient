"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import ProjectList from "/components/items/List";
import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function ProjectsPage() {
  return (
    <PageContainer title="Danh sách sản phẩm" description="">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Typography color="text.primary">Danh sách sản phẩm</Typography>
      </Breadcrumbs>
      <DashboardCard title="Danh sách sản phẩm">
        <ProjectList></ProjectList>
      </DashboardCard>
    </PageContainer>
  );
}
