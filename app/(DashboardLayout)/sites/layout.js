"use client";

import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSite, fetchSiteData } from "/store/reducers/data";

import PageContainer from "/components/container/PageContainer";
import { useParams } from "next/navigation";

export default function SitesLayout({ children }) {
  const dispatch = useDispatch();
  const params = useParams();
  const data = useSelector((state) => state.data);
  const site = data.site;

  useEffect(() => {
    params.id ? dispatch(fetchSiteData(params.id)) : dispatch(clearSite());
  }, [params, dispatch]);

  return (
    <PageContainer
      title="Khu công trình"
      description="Danh sách các khu công trình"
    >
      <Typography variant="h2">{site?.name ?? "Khu công trình"}</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
