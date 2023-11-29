"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import PageContainer from "/components/container/PageContainer";
import DashboardCard from "/components/shared/DashboardCard";

import Sites from "/components/sites";

const pageTitle = "Khu công trình";
const pageDescription = "Danh sách các khu công trình";

export default function SitesPage() {
  return (
    <PageContainer title={pageTitle} description={pageDescription}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Typography color="text.primary">Khu công trình</Typography>
      </Breadcrumbs>
      <DashboardCard title={pageTitle}>
        <Sites></Sites>
      </DashboardCard>
    </PageContainer>
  );
}
