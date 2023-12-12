"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import RoomTypeList from "/components/system/room-type";
import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function RoomTypesPage() {
  return (
    <PageContainer title="Danh sách loại phòng" description="">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Typography color="text.primary">Danh sách loại phòng</Typography>
      </Breadcrumbs>
      <DashboardCard title="Danh sách loại phòng">
        <RoomTypeList></RoomTypeList>
      </DashboardCard>
    </PageContainer>
  );
}
