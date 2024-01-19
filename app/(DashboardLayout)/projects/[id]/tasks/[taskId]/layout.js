"use client";

import { Box, Grid } from "@mui/material";

import { useState, useEffect } from "react";
import PageContainer from "/components/container/PageContainer";
import { useSelector } from "react-redux";
import { participationRoleIndex } from "/constants/enums/participationRole";
import { companyRoleConstants } from "/constants/enums/companyRole";
import Tabs from "/components/shared/Tabs";

import TabItems, { engineerItems } from "./tabItems";

export default function TaskDetailsLayout({ children }) {
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const participationRole = data?.projectRole;

  const [isManager, setIsManager] = useState(false);
  useEffect(() => {
    setIsManager(
      (user?.role && user?.role === companyRoleConstants.ADMIN) ||
        (participationRole?.role &&
          participationRole?.role === participationRoleIndex.ProjectManager)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participationRole?.role, user?.role]);

  return (
    <PageContainer title="Chi tiết công việc">
      <Grid container columnSpacing={4}>
        <Grid item xs={2} lg={2}>
          <Tabs
            vertical
            borderColor="white"
            uriPos={5}
            tabs={isManager ? TabItems : engineerItems}
          ></Tabs>
        </Grid>
        <Grid item xs={10} lg={10}>
          <Box>{children}</Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
