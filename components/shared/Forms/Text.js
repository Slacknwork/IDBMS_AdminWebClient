"use client";

import { FormControl, Grid, TextField, Typography } from "@mui/material";

export default function FormText({
  sx,
  title,
  required,
  variant = "outlined",
  subtitle = "",
  multiline,
  rows = 4,
  value,
  error,
  errorLabel,
  onChange,
}) {
  return title ? (
    <Grid container spacing={2} sx={sx}>
      <Grid item xs={4} lg={4}>
        <Typography variant="h5">
          {title}
          {required && <span style={{ color: "red" }}>*</span>}
        </Typography>
        <Typography variant="p">{subtitle || ""}</Typography>
      </Grid>
      <Grid item xs={8} lg={8}>
        <FormControl fullWidth>
          <TextField
            multiline={multiline}
            rows={rows}
            variant={variant}
            value={value}
            error={error}
            helperText={errorLabel}
            onChange={onChange}
          />
        </FormControl>
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <FormControl fullWidth>
          <TextField
            multiline={multiline}
            rows={rows}
            variant={variant}
            value={value}
            error={error}
            helperText={errorLabel}
            onChange={onChange}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
