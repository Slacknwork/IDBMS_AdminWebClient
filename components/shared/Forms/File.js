"use client";

import Image from "next/image";
import { useCallback, useState } from "react"; // Import useState
import { Box, FormControl, Grid, Paper, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/system";
import checkValidUrl from "components/validations/url"

export default function FormFile({
  sx,
  height = 120,
  titleSpan = 4,
  imgSpan = 2,
  fieldSpan = 6,
  spacing = 2,
  imgDisplay = "/images/results/no-image.png",
  imgAlt = "",
  title,
  required,
  disabled,
  subtitle = "",
  value = "",
  error,
  errorLabel,
  onChange,
  hasFile,
  fileType = "/images/results/no-file.png"
}) {
  const theme = useTheme();
  const [previewImage, setPreviewImage] = useState(null); // State for image preview

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      onChange(file);

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };

        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

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
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              mr: 3,
              borderRadius: 4,
              border: 1,
              borderColor: "whitesmoke",
              position: "relative",
              width: "10rem",
            }}
          >
            {hasFile ? (
              <Image
                src={previewImage || fileType || "/images/results/no-file.png"}
                alt={imgAlt || ""}
                width={500}
                height={500}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                onError={(e) => {
                  setPreviewImage("/images/results/no-file.png");
                }}
              />
            ) : (
              <Image
                src={previewImage || imgDisplay || "/images/results/no-image.png"}
                alt={imgAlt || ""}
                width={500}
                height={500}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                onError={(e) => {
                  setPreviewImage("/images/results/no-image.png");
                }}
              />
            )}
          </Box>
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
                  Thả tệp ...
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Kéo thả tệp vào đây, hoặc bấm để chọn tệp
                </Typography>
              )}
            </Paper>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}
