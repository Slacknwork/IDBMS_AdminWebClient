"use client";

import { Box, Grid } from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import Tabs from "/components/shared/Tabs";

import TabItems from "./tabItems";

export default function TaskDetailsLayout({ children }) {
  return (
    <PageContainer title="Chi tiết công việc">
      <Grid container columnSpacing={4}>
        <Grid item xs={2} lg={2}>
          <Tabs vertical borderColor="white" uriPos={5} tabs={TabItems}></Tabs>
        </Grid>
        <Grid item xs={10} lg={10}>
          <Box>{children}</Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
