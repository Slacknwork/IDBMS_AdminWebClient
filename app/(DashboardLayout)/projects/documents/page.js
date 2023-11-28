"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import DocumentTemplateList from "/components/documentTemplates";
import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function DocumentsPage() {
    return (
        <PageContainer title="Danh sách dự án" description="">
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                <Link underline="hover" color="inherit" href="/">
                    Trang chủ
                </Link>
                <Typography color="text.primary">Danh sách tài liệu</Typography>
            </Breadcrumbs>
            <DashboardCard title="Danh sách tài liệu">
                <DocumentTemplateList></DocumentTemplateList>
            </DashboardCard>
        </PageContainer>
    );
}