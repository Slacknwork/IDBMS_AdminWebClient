"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import TransactionList from "/components/transactions";
import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function DocumentsPage() {
    return (
        <PageContainer title="Danh sách dự án" description="">
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                <Link underline="hover" color="inherit" href="/">
                    Trang chủ
                </Link>
                <Typography color="text.primary">Danh sách giao dịch</Typography>
            </Breadcrumbs>
            <DashboardCard title="Danh sách giao dịch">
                <TransactionList></TransactionList>
            </DashboardCard>
        </PageContainer>
    );
}