"use client";

import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";

import MessageModal from "/components/shared/Modals/Message";

export default function DetailsPage({
  sx,
  loading,
  title = "Tiêu đề",
  saveLabel = "Lưu",
  saveMessage = "Lưu thông tin?",
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
            <MessageModal
              disabled={loading}
              sx={hasDelete ? { mr: 2 } : null}
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
