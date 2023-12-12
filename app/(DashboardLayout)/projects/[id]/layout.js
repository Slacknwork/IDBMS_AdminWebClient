"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectData } from "/store/reducers/data";
import { Avatar, Box, Chip, Grid, Typography } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

import languageOptions, {
  languageTypeChipImages,
  languageTypeChipColors,
} from "/constants/enums/language";
import projectStatusOptions from "/constants/enums/projectStatus";
import projectTypeOptions, {
  projectTypeChipColors,
} from "/constants/enums/projectType";

import PageContainer from "/components/container/PageContainer";
import Tabs from "/components/shared/Tabs";
import MessageModal from "/components/shared/Modals/Message";

import TabItems from "./tabItems";

export default function ProjectDetailsLayout({ children }) {
  // INIT
  const params = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const project = data.project;

  useEffect(() => {
    dispatch(fetchProjectData(params.id));
  }, [dispatch, params.id]);

  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7} sx={{ my: "auto" }}>
          <Typography variant="h2">{project.name ?? "Dự án"}</Typography>
        </Grid>
        <Grid item xs={12} lg={5} sx={{ my: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Chip
              label={projectTypeOptions[project.type]}
              color={projectTypeChipColors[project.type]}
              sx={{ mr: 2 }}
            ></Chip>
            <Chip
              avatar={
                <Avatar
                  sx={{ width: 16, height: 16 }}
                  src={languageTypeChipImages[project.language]}
                />
              }
              label={languageOptions[project.language]}
              color={languageTypeChipColors[project.language]}
              variant="outlined"
              sx={{ mr: 2 }}
            ></Chip>
            <MessageModal
              chip
              tooltip
              tooltipTitle="Cập nhật trạng thái"
              tooltipPlacement="top"
              buttonLabel={projectStatusOptions[project.status]}
              buttonEndIcon={<ChangeCircleIcon />}
            >
              <Typography sx={{ mb: 1 }} variant="h5">
                Chuyển đến trạng thái tiếp theo: Status
              </Typography>
              <Typography variant="p">
                Sau khi chuyển trạng thái, XYZ sẽ xảy ra. Xác nhận chuyển trạng
                thái?
              </Typography>
            </MessageModal>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Tabs shadows uriPos={3} tabs={TabItems}></Tabs>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </PageContainer>
  );
}
