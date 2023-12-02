"use client";

import { useState } from "react";
import { Box, Button, Grid, Modal } from "@mui/material";
import { toast } from "react-toastify";
import { updateRoomIsHidden } from "../../../../../../api/roomServices";
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

export default function HiddenModal({ children, isHidden }) {
  const params = useParams();
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleHidden = async () => {

    try {
      const response = await updateRoomIsHidden(params.roomId, isHidden);
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
        sx={{ mr: 2 }}
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
          <h2 id="child-modal-title">
            {isHidden ? <p>Ẩn</p> : <p>Hiển thị</p>}
          </h2>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              {isHidden ? <p>Ẩn thông tin phòng?</p> : <p>Hiển thị thông tin phòng?</p>}
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
                  color={isHidden ? "error" : "primary"}
                  onClick={handleHidden}
                >
                  {isHidden ? <p>Ẩn</p> : <p>Hiển thị</p>}

                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
