"use client";

import { Grid, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for react-quill

export default function FormRichText({
  sx,
  titleSpan = 4,
  fieldSpan = 8,
  spacing = 2,
  title,
  required,
  subtitle = "",
  value = "",
  onChange,
}) {
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
        <ReactQuill
          value={value || ""}
          onChange={onChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          }}
        />
      </Grid>
    </Grid>
  );
}
