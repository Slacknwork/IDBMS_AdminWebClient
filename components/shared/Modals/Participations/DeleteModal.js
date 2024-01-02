"use client";

import { useState } from "react";
import { Box, Button, Grid, Modal } from "@mui/material";
import { deleteProjectParticipation } from "/services/projectParticipationServices";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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

export default function DeleteParticipationModal({ children, id }) {
  const router = useRouter();

  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteProjectParticipation(id);
      console.log(response);
      toast.success("Xóa thành công!");
      handleClose();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <Box>
      <Button
        sx={{ ml: 2 }}
        color="error"
        variant="contained"
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
          <h2 id="child-modal-title">Xóa</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <p>Xóa thành viên tham gia?</p>
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
                  color="error"
                  onClick={handleDelete}
                >
                  Xóa
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
