"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";
import ProjectPending from "/components/projects/list/requests";

export default function ProjectRequestsPage() {
  const projectName = "Dự án đang chờ duyệt";
  return (
    <PageContainer title={projectName}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link href="/">
          <Typography>Trang chủ</Typography>
        </Link>
        <Typography>Dự án đang chờ duyệt</Typography>
      </Breadcrumbs>
      <DashboardCard title={projectName}>
        <ProjectPending></ProjectPending>
      </DashboardCard>
    </PageContainer>
  );
}
