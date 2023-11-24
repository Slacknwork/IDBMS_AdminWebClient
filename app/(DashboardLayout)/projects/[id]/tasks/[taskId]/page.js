"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";
import TaskDetails from "/components/tasks/Details";

export default function ProjectTaskDetails() {
  return (
    <PageContainer title="Thông tin công việc" description="">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/projects">
          Danh sách dự án
        </Link>
        <Link underline="hover" color="inherit" href="/projects">
          Thông tin dự án
        </Link>
        <Typography color="text.primary">Thông tin công việc</Typography>
      </Breadcrumbs>
      <DashboardCard title="Thông tin công việc">
        <TaskDetails></TaskDetails>
      </DashboardCard>
    </PageContainer>
  );
}
