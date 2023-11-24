"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";
import ProjectDetails from "/components/projects/Details";

export default function ProjectDetailsPage() {
  return (
    <PageContainer title="Thông tin dự án" description="">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/projects">
          Danh sách dự án
        </Link>
        <Typography color="text.primary">Thông tin dự án</Typography>
      </Breadcrumbs>
      <DashboardCard title="Thông tin dự án">
        <ProjectDetails></ProjectDetails>
      </DashboardCard>
    </PageContainer>
  );
}
