import { useParams } from "next/navigation";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";

import projectTaskStatusOptions, {
  projectTaskStatusIndex,
} from "/constants/enums/projectTaskStatus";

import { updateProjectTaskStatus } from "/services/projectTaskServices";

import FormModal from "/components/shared/Modals/Form";
import MessageModal from "/components/shared/Modals/Message";

export default function UpdateTaskStatusModal({
  sx,
  task,
  setTaskStatus,
  success,
}) {
  const params = useParams();

  const onUpdateStatus = async (status) => {
    try {
      const projectId = params.id;
      await updateProjectTaskStatus(task?.id, status, projectId);
      toast.success("Cập nhật trạng thái công việc thành cống!");
      typeof setTaskStatus === "function" && setTaskStatus(task?.id, status);
      typeof success === "function" && success();
    } catch (error) {
      toast.error("Lỗi cập nhật trạng thái công việc!");
    }
  };

  return (
    <FormModal
      sx={sx}
      chip
      tooltipTitle="Cập nhật"
      tooltipPlacement="top"
      size="small"
      disableSubmitFunction
      submitLabel="Đóng"
      submitVariant="outlined"
      title="Trạng thái công việc"
      buttonLabel={projectTaskStatusOptions[task?.status]}
      buttonEndIcon={<ChangeCircleIcon />}
    >
      <Grid item xs={12} lg={12}>
        {task?.status === projectTaskStatusIndex.Cancelled ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CancelIcon color="error" sx={{ fontSize: 60 }}></CancelIcon>
            <Typography variant="h4" sx={{ mt: 1, textAlign: "center" }}>
              Đã hủy công việc.
            </Typography>
            <Typography variant="p" sx={{ mt: 1, textAlign: "center" }}>
              Công việc này đã bị hủy. Hãy tạo công việc mới
            </Typography>
          </Box>
        ) : (
          projectTaskStatusOptions.map(
            (status, index) =>
              ![projectTaskStatusIndex.Cancelled].includes(index) && (
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
                    {task?.status === projectTaskStatusIndex.Done ||
                    index < task?.status ? (
                      <CheckCircleIcon
                        sx={{ my: "auto", mr: 2 }}
                        color="success"
                      ></CheckCircleIcon>
                    ) : task?.status === index ? (
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
                      fontWeight={task?.status === index ? 700 : 400}
                      sx={{ my: "auto" }}
                    >
                      {projectTaskStatusOptions[index]}
                    </Typography>
                  </Box>
                  {task?.status === index &&
                  task?.status < projectTaskStatusIndex.Done ? (
                    <MessageModal
                      color="error"
                      buttonSize="small"
                      buttonLabel="Hủy"
                      buttonVariant="contained"
                      onSubmit={() =>
                        onUpdateStatus(projectTaskStatusIndex.Cancelled)
                      }
                    ></MessageModal>
                  ) : task?.status === projectTaskStatusIndex.Ongoing &&
                    index === projectTaskStatusIndex.Done ? (
                    <MessageModal
                      buttonSize="small"
                      buttonLabel="Hoàn thành"
                      buttonVariant="contained"
                      onSubmit={() =>
                        onUpdateStatus(projectTaskStatusIndex.Done)
                      }
                    >
                      <Typography variant="p" inline>
                        Hoàn thành công việc?
                      </Typography>
                    </MessageModal>
                  ) : (
                    task?.status < projectTaskStatusIndex.Done &&
                    index === task?.status + 1 && (
                      <MessageModal
                        buttonSize="small"
                        buttonLabel="Tiếp"
                        buttonVariant="contained"
                        onSubmit={() => onUpdateStatus(index)}
                      >
                        <Typography variant="p" inline>
                          Cập nhật trạng thái công việc:{"  "}
                        </Typography>
                        <Typography variant="p" fontWeight={600} fontSize={16}>
                          {projectTaskStatusOptions[index]}?
                        </Typography>
                      </MessageModal>
                    )
                  )}
                </Box>
              )
          )
        )}
      </Grid>
    </FormModal>
  );
}
