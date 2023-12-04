"use client";

import { useEffect, useState } from "react";
import { Box, Button, FormControl, Grid, MenuItem, Modal, Select } from "@mui/material";
import projectTaskStatusOptions from "../../../../../../../constants/enums/projectTaskStatus";
import { updateProjectTaskStatus } from "../../../../../../../api/projectTaskServices";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function UpdateTaskStatusModal({ children, currentStatus }) {
  const params = useParams();
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [status, setStatus] = useState(currentStatus);

  useEffect(() => {
    setStatus(currentStatus)
  }, [currentStatus]);

  const handleUpdateStatus = async () => {
    try {
      const response = await updateProjectTaskStatus(params.taskId ?? null, status);
      console.log(response);
      toast.success("Cập nhật thành công!");
      handleClose()

    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <Box>
      <Button
        sx={{ mr: 2, width: '170px' }}
        variant="outlined"
        disableElevation
        onClick={handleOpen}
      >
        {children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title">Cập nhật trạng thái công việc</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <FormControl fullWidth sx={{ padding: '16px' }}>
                <Select
                  variant="outlined"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >
                  {projectTaskStatusOptions.map((unit, index) => (
                    <MenuItem key={index} value={index}>
                      {unit}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  disableElevation
                  color="error"
                  onClick={handleClose}
                  sx={{ mr: 2 }}
                >
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  disableElevation
                  color="success"
                  onClick={handleUpdateStatus}
                >
                  Cập nhật
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
