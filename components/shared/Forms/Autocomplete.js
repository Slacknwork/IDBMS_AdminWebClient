"use client";

import { Autocomplete, Grid, TextField, Typography } from "@mui/material";

export default function AutocompleteForm({
  sx,
  title,
  required,
  variant = "outlined",
  subtitle = "",
  label,
  value,
  options,
  error,
  errorLabel,
  onChange,
}) {
  return (
    <Grid container spacing={2} sx={sx}>
      {title && (
        <Grid item xs={4} lg={4}>
          <Typography variant="h5">
            {title}
            {required && <span style={{ color: "red" }}>*</span>}
          </Typography>
          <Typography variant="p">{subtitle || ""}</Typography>
        </Grid>
      )}
      <Grid item xs={title ? 8 : 12} lg={title ? 8 : 12}>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.name}
          value={value}
          onChange={(_, newValue) => onChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label || ""}
              variant={variant}
              error={error}
              helperText={errorLabel}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
