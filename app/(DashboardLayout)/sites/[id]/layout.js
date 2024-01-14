"use client";

import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSiteData } from "/store/reducers/data";

import Tabs from "/components/shared/Tabs";
import PageContainer from "/components/container/PageContainer";
import TabItems from "./tabItems";

export default function SitesLayout({ children }) {
  const dispatch = useDispatch();
  const params = useParams();
  const data = useSelector((state) => state.data);
  const site = data?.site;

  useEffect(() => {
    dispatch(fetchSiteData(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer
      title="Khu công trình"
      description="Danh sách các khu công trình"
    >
      <Typography variant="h2">{site?.name ?? "Khu công trình"}</Typography>

      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Tabs shadows uriPos={3} tabs={TabItems}></Tabs>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
