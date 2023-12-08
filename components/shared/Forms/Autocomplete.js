"use client";

import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function AutocompleteForm({
  sx,
  title,
  titleSpan = 4,
  fieldSpan = 8,
  spacing = 2,
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
    setSelectedObject(options.find((option) => option.id === value) ?? null);
  }, [options, value]);

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
        <Autocomplete
          disabled={disabled}
          options={options}
          getOptionLabel={(option) =>
            option.code
              ? `${option.code} - ${option.name}`
              : option.usePurpose
              ? option.usePurpose
              : option.name
          }
          isOptionEqualToValue={(option, value) => option.id === value?.id}
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
