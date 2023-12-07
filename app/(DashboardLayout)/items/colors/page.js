"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import ColorList from "/components/items/colors/List";
import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function ProjectsPage() {
  return (
    <PageContainer title="Danh sách màu" description="">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Typography color="text.primary">Danh sách màu</Typography>
      </Breadcrumbs>
      <DashboardCard title="Danh sách màu">
        <ColorList></ColorList>
      </DashboardCard>
    </PageContainer>
  );
}
