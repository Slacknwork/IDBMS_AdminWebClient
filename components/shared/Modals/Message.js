"use client";

import { useState } from "react";
import { Box, Button, Grid, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function MessageModal({
  color = "primary",
  sx,
  disabled,
  buttonLabel,
  onSubmit,
  title,
  cancelLabel,
  submitLabel,
  children,
}) {
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit();
    handleClose();
  };

  return (
    <Box sx={sx}>
      <Button
        disabled={disabled}
        color={color}
        variant="contained"
        disableElevation
        onClick={handleOpen}
      >
        {buttonLabel}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title">{title}</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              {children}
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  color={color}
                  variant="outlined"
                  disableElevation
                  onClick={handleClose}
                  sx={{ mr: 2 }}
                >
                  {cancelLabel || "Hủy"}
                </Button>
                <Button
                  color={color}
                  variant="contained"
                  disableElevation
                  onClick={handleSubmit}
                >
                  {submitLabel || "Chấp nhận"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
