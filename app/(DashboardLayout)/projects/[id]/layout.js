"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectData } from "/store/reducers/data";
import { Avatar, Box, CircularProgress, Grid, Typography } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import languageOptions, {
  languageTypeChipImages,
  languageTypeChipColors,
} from "/constants/enums/language";
import projectStatusOptions from "/constants/enums/projectStatus";
import projectTypeOptions, {
  projectTypeChipColors,
} from "/constants/enums/projectType";

import { updateProjectStatus } from "/api/projectServices";

import PageContainer from "/components/container/PageContainer";
import Tabs from "/components/shared/Tabs";
import MessageModal from "/components/shared/Modals/Message";
import FormModal from "/components/shared/Modals/Form";

import TabItems from "./tabItems";
import { toast } from "react-toastify";

export default function ProjectDetailsLayout({ children }) {
  // INIT
  const params = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const project = data.project;

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
  }, [dispatch, params.id]);

  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7} sx={{ my: "auto" }}>
          <Typography variant="h2">{project.name ?? "Dự án"}</Typography>
        </Grid>
        <Grid item xs={12} lg={5} sx={{ my: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MessageModal
              disableSubmit
              submitLabel="Đóng"
              buttonLabel={projectTypeOptions[project.type]}
              color={projectTypeChipColors[project.type]}
              sx={{ mr: 2 }}
            >
              <Typography sx={{ mb: 1 }} variant="h4">
                Loại dự án: {projectTypeOptions[project.type]}
              </Typography>
            </MessageModal>
            <MessageModal
              disableSubmit
              submitLabel="Đóng"
              buttonVariant="outlined"
              buttonLabel={languageOptions[project.language]}
              color={languageTypeChipColors[project.language]}
              buttonEndIcon={
                <Avatar
                  sx={{ width: 18, height: 18 }}
                  src={languageTypeChipImages[project.language]}
                />
              }
              sx={{ mr: 2 }}
            >
              <Typography sx={{ mb: 1 }} variant="h4">
                Ngôn ngữ dự án: {languageOptions[project.language]}
              </Typography>
            </MessageModal>
            <FormModal
              size="small"
              disableSubmit
              submitLabel="Đóng"
              submitVariant="outlined"
              title="Trạng thái dự án"
              disabled={project.status > 6}
              buttonLabel={projectStatusOptions[project.status]}
              buttonEndIcon={<ChangeCircleIcon />}
            >
              <Grid item xs={12} lg={12}>
                {project.status === 6 ? (
                  <Box>
                    <Typography variant="h4">Dự án đã hủy.</Typography>
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
                            {project.status === 5 && index === 4 ? (
                              <PauseCircleIcon
                                sx={{ my: "auto", mr: 2 }}
                                color="error"
                              ></PauseCircleIcon>
                            ) : project.status === 7 ||
                              index < project.status ? (
                              <CheckCircleIcon
                                sx={{ my: "auto", mr: 2 }}
                                color="success"
                              ></CheckCircleIcon>
                            ) : project.status === index ? (
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
                              fontWeight={project.status === index ? 700 : 400}
                              sx={{ my: "auto" }}
                            >
                              {projectStatusOptions[index]}
                            </Typography>
                          </Box>
                          {project.status === 5 && index === 4 ? (
                            <MessageModal
                              buttonSize="small"
                              buttonLabel="Tiếp tục"
                              buttonVariant="contained"
                              onSubmit={() => onUpdateStatus(4)}
                            ></MessageModal>
                          ) : project.status === 4 && index === 4 ? (
                            <MessageModal
                              color="error"
                              buttonSize="small"
                              buttonLabel="Hoãn"
                              buttonVariant="contained"
                              onSubmit={() => onUpdateStatus(5)}
                            ></MessageModal>
                          ) : project.status === index && project.status < 4 ? (
                            <MessageModal
                              color="error"
                              buttonSize="small"
                              buttonLabel="Hủy"
                              buttonVariant="contained"
                              onSubmit={() => onUpdateStatus(6)}
                            ></MessageModal>
                          ) : project.status === 4 && index === 7 ? (
                            <MessageModal
                              buttonSize="small"
                              buttonLabel="Hoàn thành"
                              buttonVariant="contained"
                              onSubmit={() => onUpdateStatus(7)}
                            ></MessageModal>
                          ) : (
                            project.status < 4 &&
                            index === project.status + 1 && (
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
