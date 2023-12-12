"use client";

import { useState } from "react";
import { Box, Button, Chip, Grid, Modal, Tooltip } from "@mui/material";

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
  chip,
  disabled = false,
  buttonLabel,
  buttonSize,
  buttonVariant,
  buttonEndIcon,
  tooltipTitle,
  tooltipPlacement,
  disableSubmit,
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
    <Box>
      {chip ? (
        <Tooltip title={tooltipTitle} placement={tooltipPlacement} arrow>
          <Chip
            disabled={disabled}
            variant={buttonVariant ?? "contained"}
            label={buttonLabel}
            color={color}
            onClick={handleOpen}
            icon={buttonEndIcon}
          ></Chip>
        </Tooltip>
      ) : (
        <Button
          sx={sx}
          size={buttonSize ?? ""}
          disabled={disabled}
          color={color}
          variant={buttonVariant ?? "contained"}
          disableElevation
          onClick={handleOpen}
          endIcon={buttonEndIcon}
        >
          {buttonLabel}
        </Button>
      )}

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
                {!disableSubmit && (
                  <Button
                    color={color}
                    variant="outlined"
                    disableElevation
                    onClick={handleClose}
                    sx={{ mr: 2 }}
                  >
                    {cancelLabel || "Hủy"}
                  </Button>
                )}
                <Button
                  color={color}
                  variant={disableSubmit ? "outlined" : "contained"}
                  disableElevation
                  onClick={disableSubmit ? handleClose : handleSubmit}
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
