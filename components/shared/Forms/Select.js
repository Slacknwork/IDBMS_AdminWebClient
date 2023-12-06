"use client";

import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export default function FormText({
  sx,
  title,
  required,
  disabled,
  variant = "outlined",
  subtitle = "",
  value,
  options,
  defaultValue = -1,
  defaultLabel = "Chọn một",
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
        <FormControl fullWidth>
          <Select
            disabled={disabled}
            variant={variant}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            error={error}
          >
            <MenuItem disabled value={defaultValue}>
              {defaultLabel}
            </MenuItem>
            {options.map((option, index) => (
              <MenuItem key={option} value={index}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{errorLabel}</FormHelperText>}
        </FormControl>
      </Grid>
    </Grid>
  );
}
