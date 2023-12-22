"use client";

import { Box, Grid } from "@mui/material";
import Tabs from "/components/shared/Tabs";
import TabItems from "./tabItems"

export default function ProjectDesignDetailsLayout({ children }) {
  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={2} lg={2}>
        <Tabs vertical borderColor="white" uriPos={5} tabs={TabItems}></Tabs>
      </Grid>
      <Grid item xs={10} lg={10}>
        <Box>{children}</Box>
      </Grid>
    </Grid>
  );
}
