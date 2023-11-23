"use client";

import { Grid, Box } from "@mui/material";
import PageContainer from "/components/container/PageContainer";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}></Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
