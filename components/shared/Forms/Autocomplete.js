"use client";

import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function AutocompleteForm({
  sx,
  title,
  required,
  disabled,
  variant = "outlined",
  subtitle = "",
  label,
  value,
  options,
  error,
  errorLabel,
  onChange,
}) {
  const [selectedObject, setSelectedObject] = useState(null);
  const onSelectedObjectChange = (value) => {
    setSelectedObject(value);
    onChange(value?.id);
  };
  useEffect(() => {
    setSelectedObject(options.find((option) => option.id === value));
  }, [options, value]);

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
          disabled={disabled}
          options={options}
          getOptionLabel={(option) => option.name}
          value={selectedObject}
          onChange={(_, newValue) => onSelectedObjectChange(newValue)}
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
