"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Chip, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

import { fetchProjectData } from "/store/reducers/data";

import languageOptions, {
  languageTypeChipImages,
  languageTypeChipColors,
} from "/constants/enums/language";
import advertisementStatusOptions from "/constants/enums/advertisementStatus";
import projectTypeOptions, {
  projectTypeChipColors,
} from "/constants/enums/projectType";

import { updateAdvertisementProjectStatus } from "/api/advertisementServices";

import PageContainer from "/components/container/PageContainer";
import Tabs from "/components/shared/Tabs";
import MessageModal from "/components/shared/Modals/Message";

import TabItems from "./tabItems";

export default function ProjectDetailsLayout({ children }) {
  // INIT
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const project = data.project;

  const onUpdateAdvertisementStatus = async (status) => {
    try {
      await updateAdvertisementProjectStatus(params.id, status);
      dispatch(fetchProjectData(params.id));
      toast.success("Cập nhật thành công!");
      if (status === 0) {
        router.push(`/advertisement`);
      }
    } catch (error) {
      toast.error("Lỗi cập nhật trạng thái dự án!");
      console.log(error);
    }
  };

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
              sx={{
                mr: 2,
                my: "auto",
                "& .MuiChip-label": {
                  paddingTop: "1px",
                },
              }}
            ></Chip>
            <Chip
              avatar={
                <Avatar
                  sx={{ width: 18, height: 18 }}
                  src={languageTypeChipImages[project.language]}
                />
              }
              variant="outlined"
              label={languageOptions[project.language]}
              color={languageTypeChipColors[project.language]}
              sx={{
                mr: 2,
                my: "auto",
                "& .MuiChip-label": {
                  paddingTop: "1px",
                },
              }}
            ></Chip>
            <MessageModal
              chip
              tooltipTitle="Cập nhật trạng thái"
              tooltipPlacement="top"
              size="small"
              submitLabel="Chấp nhận"
              submitVariant="outlined"
              onSubmit={() =>
                onUpdateAdvertisementStatus(
                  project.advertisementStatus === 1 ? 2 : 1
                )
              }
              title="Trạng thái quảng cáo"
              buttonLabel={
                advertisementStatusOptions[project.advertisementStatus]
              }
              buttonEndIcon={<ChangeCircleIcon />}
              bottomLeftContent={
                <MessageModal
                  sx={{ width: 125 }}
                  color="error"
                  buttonLabel="Chưa đồng ý"
                  onSubmit={() => onUpdateAdvertisementStatus(0)}
                >
                  a
                </MessageModal>
              }
            >
              <Grid item xs={12} lg={12} sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight={400}>
                  {project.advertisementStatus === 1
                    ? "Công khai dự án này?"
                    : "Không công khai dự án này?"}
                </Typography>
              </Grid>
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
