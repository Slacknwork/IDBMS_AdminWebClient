"use client";

import { useCallback } from "react";
import { FormControl, Grid, Paper, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/system";

export default function FormFile({
  sx,
  height = 120,
  titleSpan = 4,
  fieldSpan = 8,
  spacing = 2,
  title,
  required,
  disabled,
  subtitle = "",
  value = "",
  error,
  errorLabel,
  onChange,
}) {
  const theme = useTheme();

  const onDrop = useCallback((acceptedFiles) => {
    onChange(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Grid container spacing={spacing} sx={sx}>
      {title && (
        <Grid item xs={titleSpan} lg={titleSpan}>
          <Typography variant="h5">
            {title}
            {required && <span style={{ color: "red" }}>*</span>}
          </Typography>
          <Typography variant="p">{subtitle || ""}</Typography>
        </Grid>
      )}
      <Grid item xs={title ? fieldSpan : 12} lg={title ? fieldSpan : 12}>
        <FormControl fullWidth>
          <Paper
            {...getRootProps()}
            sx={{
              p: 2,
              border: isDragActive
                ? "2px dashed " + theme.palette.primary.main
                : "2px dashed #ddd",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              outline: "none",
              justifyContent: "center",
              height: height,
            }}
          >
            <input {...getInputProps()} />
            {value ? (
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.primary }}
              >
                {value.name}
              </Typography>
            ) : isDragActive ? (
              <Typography
                variant="body1"
                sx={{ color: theme.palette.primary.main }}
              >
                Drop the files here ...
              </Typography>
            ) : (
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.secondary }}
              >
                Drag and drop some files here, or click to select files
              </Typography>
            )}
          </Paper>
        </FormControl>
      </Grid>
    </Grid>
  );
}
