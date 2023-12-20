"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";

export default function FormModal({
  sx,
  children,
  buttonLabel,
  buttonSize,
  buttonVariant,
  buttonEndIcon,
  chip,
  tooltipTitle,
  tooltipPlacement,
  title,
  disabled,
  color,
  disableSubmit,
  submitVariant,
  submitLabel,
  hasOpenEvent,
  isOpen = false,
  onOpen,
  onSubmit,
  bottomLeftContent,
  size = "",
}) {
  // STYLE
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:
      size === "big" && isBigScreen
        ? "60rem"
        : size === "small"
        ? "25rem"
        : "40rem",
    bgcolor: "background.paper",
    overflowY: "auto",
    boxShadow: 24,
  };

  // MODAL TOGGLE
  const [open, setOpen] = useState(isOpen);
  const handleOpen = () => {
    hasOpenEvent && onOpen();
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
      {chip ? (
        <Tooltip title={tooltipTitle} placement={tooltipPlacement} arrow>
          <Chip
            disabled={disabled}
            variant={buttonVariant ?? "contained"}
            label={buttonLabel}
            color={color ?? "primary"}
            onClick={handleOpen}
            icon={buttonEndIcon}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              "& .MuiChip-label": {
                paddingRight: "6px",
                paddingTop: "1px",
              },
              "& .MuiChip-icon": {
                order: 1,
                paddingLeft: "0px",
                marginLeft: "0px",
                marginRight: "4px",
              },
            }}
          ></Chip>
        </Tooltip>
      ) : (
        <Tooltip title={tooltipTitle} placement={tooltipPlacement} arrow>
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
        </Tooltip>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }} component="div">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pt: 2,
              mx: 3,
              height: "5rem",
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              borderBottom: 1,
              zIndex: 1,
            }}
          >
            <Typography variant="h4" id="child-modal-title" sx={{ py: 2 }}>
              {title || ""}
            </Typography>
            <IconButton
              aria-label="close"
              sx={{
                my: "auto",
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid
            sx={{ px: 3, my: 1, maxHeight: "30rem", overflowY: "auto" }}
            component={"div"}
            container
            columnSpacing={8}
            rowSpacing={3}
          >
            {children}
            {/* SUBMIT */}
            <Grid item xs={12} lg={12}>
              <Box
                sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}
                spacing={2}
              >
                <Box>{bottomLeftContent}</Box>
                <Button
                  variant={submitVariant ?? "contained"}
                  disableElevation
                  onClick={disableSubmit ? handleClose : handleSubmit}
                >
                  {submitLabel || ""}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
