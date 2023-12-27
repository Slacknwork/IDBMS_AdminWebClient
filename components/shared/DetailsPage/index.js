"use client";

import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";

import MessageModal from "/components/shared/Modals/Message";

export default function DetailsPage({
  sx,
  loading,
  title = "Tiêu đề",
  saveLabel = "Lưu",
  saveMessage = "Lưu thông tin?",
  hasHide,
  isHidden = false,
  hideLabel = "Ẩn",
  hideMessage = "Ẩn thông tin?",
  showLabel = "Hiện",
  showMessage = "Hiện thông tin?",
  onHiddenStatusChange,
  deleteLabel = "Xóa",
  deleteMessage = "Xóa thông tin?",
  onSave,
  hasDelete,
  onDelete,
  children,
}) {
  return (
    <Box sx={{ overflow: "auto" }}>
      <Grid sx={sx} container columnSpacing={4} rowSpacing={4}>
        <Grid
          item
          xs={12}
          lg={12}
          sx={{
            borderBottom: 1,
            display: "flex",
            justifyContent: "space-between",
            borderColor: "grey.500",
            py: 3,
          }}
        >
          <Typography variant="h3" sx={{ my: "auto" }}>
            {title}
          </Typography>
          <Box sx={{ display: "flex" }}>

            {hasHide ? (
              isHidden ? (
                <MessageModal
                  disabled={loading}
                  sx={{ ml: 2 }}
                  buttonLabel={showLabel}
                  onSubmit={onHiddenStatusChange}
                  title={showLabel}
                  submitLabel={showLabel}
                  color="success"
                >
                  <Typography variant="p">{showMessage}</Typography>
                </MessageModal>
              ) : (
                <MessageModal
                  disabled={loading}
                  sx={{ ml: 2 }}
                  buttonLabel={hideLabel}
                  onSubmit={onHiddenStatusChange}
                  title={hideLabel}
                  submitLabel={hideLabel}
                  color="warning"
                >
                  <Typography variant="p">{hideMessage}</Typography>
                </MessageModal>
              )
            ) : null}

            <MessageModal
              disabled={loading}
              sx={{ ml: 2 }}
              buttonLabel={saveLabel}
              onSubmit={onSave}
              title={saveLabel}
              submitLabel={saveLabel}
            >
              <Typography variant="p">{saveMessage}</Typography>
            </MessageModal>

            {hasDelete ? (
              <MessageModal
                disabled={loading}
                color="error"
                sx={{ ml: 2 }}
                buttonLabel={deleteLabel}
                onSubmit={onDelete}
                title={deleteLabel}
                submitLabel={deleteLabel}
              >
                <Typography variant="p">{deleteMessage}</Typography>
              </MessageModal>
            ) : null}
          </Box>
        </Grid>
        {loading ? (
          <Grid item xs={12} lg={12} sx={{ my: 10 }}>
            <Stack>
              <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
            </Stack>
          </Grid>
        ) : (
          children
        )}
      </Grid>
    </Box>
  );
}
