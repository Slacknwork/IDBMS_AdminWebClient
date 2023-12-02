"use client";

import { useState } from "react";
import { Box, Button, Grid, Modal } from "@mui/material";
import { updateRoom } from "../../../../../../api/roomServices";
import { useParams } from "next/navigation";
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

export default function SiteModal({ children, request }) {
  const params = useParams();
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    console.log(request);
    try {
      const response = await updateRoom(params.roomId ?? "", request);
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
      <Button variant="contained" disableElevation onClick={handleOpen}>
        {children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title">Lưu</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <p>Lưu thông tin tầng?</p>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  disableElevation
                  onClick={handleClose}
                  sx={{ mr: 2 }}
                >
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleUpdate}
                >
                  Lưu
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
