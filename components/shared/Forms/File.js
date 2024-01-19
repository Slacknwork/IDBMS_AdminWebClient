"use client";

import Image from "next/image";
import { useCallback, useState } from "react"; // Import useState
import {
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/system";
import checkValidUrl from "components/validations/url";
import { downloadFileByUrl } from "/services/downloadServices";
import { toast } from "react-toastify";

export default function FormFile({
  sx,
  height = 120,
  titleSpan = 4,
  imgSpan = 2,
  fieldSpan = 6,
  spacing = 2,
  imgDisplay,
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
  fileType = "/images/results/no-file.png",
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

  const downloadImgDisplay = async () => {
    if (!imgDisplay) return;
    try {
      toast.loading("Đang tải file...");
      await downloadFileByUrl({ imageUrl: imgDisplay });
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error("Lỗi tải file!");
    }
  };

  const removeFile = () => {
    onChange(null);
    setPreviewImage(null);
  };

  return (
    <Grid container spacing={spacing} sx={sx}>
      {title && (
        <Grid item xs={titleSpan} lg={titleSpan}>
          <Typography variant="h5">
            {title}
            {required && <span style={{ color: "red" }}>*</span>}
          </Typography>
          <Typography variant="p">{subtitle || ""}</Typography>
          <Box display="flex" sx={{ mt: 1 }}>
            {imgDisplay && (
              <Button
                sx={{ mr: 1 }}
                size="small"
                variant="contained"
                disableElevation
                onClick={downloadImgDisplay}
              >
                Tải file
              </Button>
            )}
            {value && (
              <Button
                color="error"
                sx={{ mr: 1 }}
                size=""
                variant="contained"
                disableElevation
                onClick={removeFile}
              >
                Xóa
              </Button>
            )}
          </Box>
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
                unoptimized={true}
              />
            ) : (
              <Image
                src={
                  previewImage || imgDisplay || "/images/results/no-image.png"
                }
                alt={imgAlt || ""}
                width={500}
                height={500}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                onError={(e) => {
                  if (imgDisplay !== null)
                    setPreviewImage("/images/results/has-file.png");
                  else
                    setPreviewImage("/images/results/no-image.png");
                }}
                unoptimized={true}
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
