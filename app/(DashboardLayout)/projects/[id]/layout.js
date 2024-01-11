"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import languageOptions, {
  languageTypeChipImages,
  languageTypeChipColors,
} from "/constants/enums/language";
import projectStatusOptions from "/constants/enums/projectStatus";
import projectTypeOptions, {
  projectTypeChipColors,
} from "/constants/enums/projectType";
import participationRoleOptions, {
  participationRoleIndex,
} from "/constants/enums/participationRole";
import timezone from "/constants/timezone";
import roleConstants from "/constants/roles";

moment.tz.setDefault(timezone.momentDefault);

import { updateProjectStatus } from "/services/projectServices";

import { fetchProjectData, fetchProjectRoleData } from "/store/reducers/data";

import PageContainer from "/components/container/PageContainer";
import Tabs from "/components/shared/Tabs";
import MessageModal from "/components/shared/Modals/Message";
import FormModal from "/components/shared/Modals/Form";

import TabItems from "./tabItems";

export default function ProjectDetailsLayout({ children }) {
  // INIT
  const params = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const user = useSelector((state) => state.user);
  const project = data?.project;
  const participationRole = data?.projectRole;

  const isInWarranty = () => {
    if (project?.warrantyPeriodEndTime) {
      return moment() > project?.warrantyPeriodEndTime;
    }
    return true;
  };

  const onUpdateStatus = async (status) => {
    try {
      await updateProjectStatus(params.id, status);
      dispatch(fetchProjectData(params.id));
      toast.success("Cập nhật thành công!");
    } catch (error) {
      toast.error("Lỗi cập nhật trạng thái dự án!");
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchProjectData(params.id));
    if (user?.role && user?.role !== roleConstants.ADMIN) {
      dispatch(
        fetchProjectRoleData({ userId: user?.id, projectId: params.id })
      );
    }
  }, [dispatch, params.id, user?.id, user?.role]);

  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7} sx={{ my: "auto" }}>
          <Typography variant="h2">{project?.name ?? "Dự án"}</Typography>
        </Grid>
        <Grid item xs={12} lg={5} sx={{ my: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {user?.role && user?.role !== roleConstants.ADMIN && (
              <Chip
                label={
                  participationRoleOptions[
                    participationRole.role ?? participationRoleIndex.Viewer
                  ]
                }
                color={"primary"}
                sx={{
                  mr: 2,
                  my: "auto",
                  "& .MuiChip-label": {
                    paddingTop: "1px",
                  },
                }}
              ></Chip>
            )}
            <Chip
              label={projectTypeOptions[project?.type]}
              color={projectTypeChipColors[project?.type]}
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
                  src={languageTypeChipImages[project?.language]}
                />
              }
              variant="outlined"
              label={languageOptions[project?.language]}
              color={languageTypeChipColors[project?.language]}
              sx={{
                mr: 2,
                my: "auto",
                "& .MuiChip-label": {
                  paddingTop: "1px",
                },
              }}
            ></Chip>
            <FormModal
              chip
              tooltipTitle="Cập nhật trạng thái"
              tooltipPlacement="top"
              size="small"
              disableSubmitFunction
              submitLabel="Đóng"
              submitVariant="outlined"
              title="Trạng thái dự án"
              buttonLabel={projectStatusOptions[project?.status]}
              buttonEndIcon={<ChangeCircleIcon />}
            >
              <Grid item xs={12} lg={12}>
                {project?.status === 6 ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <CancelIcon
                      color="error"
                      sx={{ fontSize: 60 }}
                    ></CancelIcon>
                    <Typography
                      variant="h4"
                      sx={{ mt: 1, textAlign: "center" }}
                    >
                      Đã hủy dự án.
                    </Typography>
                    <Typography variant="p" sx={{ mt: 1, textAlign: "center" }}>
                      Dự án đã bị hủy. Bắt đầu lại dự án ở giai đoạn Trao đổi?
                    </Typography>
                    <MessageModal
                      sx={{ mt: 2 }}
                      color="success"
                      buttonLabel="Bắt đầu"
                      buttonVariant="contained"
                      onSubmit={() => onUpdateStatus(2)}
                    >
                      <Typography variant="h4" sx={{ mb: 2 }}>
                        Xác nhận
                      </Typography>
                      <Typography variant="p">
                        Bắt đầu lại dự án từ giai đoạn Trao đổi?
                      </Typography>
                    </MessageModal>
                  </Box>
                ) : (
                  projectStatusOptions.map(
                    (status, index) =>
                      ![0, 5, 6].includes(index) && (
                        <Box
                          key={status}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            py: 1,
                            borderBottom: 1,
                            borderColor: "lightgray",
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            {project?.status === 5 && index === 4 ? (
                              <PauseCircleIcon
                                sx={{ my: "auto", mr: 2 }}
                                color="error"
                              ></PauseCircleIcon>
                            ) : project?.status === 8 ||
                              index < project?.status ? (
                              <CheckCircleIcon
                                sx={{ my: "auto", mr: 2 }}
                                color="success"
                              ></CheckCircleIcon>
                            ) : project?.status === index ? (
                              <CircularProgress
                                sx={{ my: "auto", mr: 2 }}
                                variant="determinate"
                                value={75}
                                size={25}
                                thickness={8}
                              ></CircularProgress>
                            ) : (
                              <PendingIcon
                                sx={{ my: "auto", mr: 2 }}
                                color="disabled"
                              ></PendingIcon>
                            )}
                            <Typography
                              variant="h6"
                              fontWeight={project?.status === index ? 700 : 400}
                              sx={{ my: "auto" }}
                            >
                              {projectStatusOptions[index]}
                            </Typography>
                          </Box>
                          {project?.status === 5 && index === 4 ? (
                            <MessageModal
                              buttonSize="small"
                              buttonLabel="Tiếp tục"
                              buttonVariant="contained"
                              onSubmit={() => onUpdateStatus(4)}
                            ></MessageModal>
                          ) : project?.status === 4 && index === 4 ? (
                            <MessageModal
                              color="error"
                              buttonSize="small"
                              buttonLabel="Hoãn"
                              buttonVariant="contained"
                              onSubmit={() => onUpdateStatus(5)}
                            ></MessageModal>
                          ) : project?.status === index &&
                            project?.status < 4 ? (
                            <MessageModal
                              color="error"
                              buttonSize="small"
                              buttonLabel="Hủy"
                              buttonVariant="contained"
                              onSubmit={() => onUpdateStatus(6)}
                            ></MessageModal>
                          ) : project?.status === 4 && index === 7 ? (
                            <MessageModal
                              buttonSize="small"
                              buttonLabel="Bảo hành"
                              buttonVariant="contained"
                              onSubmit={() => onUpdateStatus(7)}
                            ></MessageModal>
                          ) : project?.status === 7 && index === 8 ? (
                            <MessageModal
                              disabled={isInWarranty()}
                              buttonSize="small"
                              buttonLabel="Hoàn thành"
                              buttonVariant="contained"
                              onSubmit={() => onUpdateStatus(8)}
                            ></MessageModal>
                          ) : (
                            project?.status < 4 &&
                            index === project?.status + 1 && (
                              <MessageModal
                                buttonSize="small"
                                buttonLabel="Tiếp"
                                buttonVariant="contained"
                                onSubmit={() => onUpdateStatus(index)}
                              ></MessageModal>
                            )
                          )}
                        </Box>
                      )
                  )
                )}
              </Grid>
            </FormModal>
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
