"use client";

import { Grid } from "@mui/material";

import RecentTransactions from "/components/dashboard/RecentTransactions";
import ProductPerformance from "/components/dashboard/ProductPerformance";
import PageContainer from "/components/container/PageContainer";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <RecentTransactions></RecentTransactions>
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerformance></ProductPerformance>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Dashboard;
