"use client";

import { FormControl, Grid, TextField, Typography } from "@mui/material";

export default function FormText({
  sx,
  titleSpan = 4,
  fieldSpan = 8,
  title,
  required,
  disabled,
  variant = "outlined",
  subtitle = "",
  multiline,
  rows = 4,
  value = "",
  error,
  errorLabel,
  onChange,
}) {
  return (
    <Grid container spacing={2} sx={sx}>
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
          <TextField
            disabled={disabled}
            multiline={multiline}
            rows={rows}
            variant={variant}
            value={value ?? ""}
            error={error}
            helperText={errorLabel}
            onChange={onChange}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
