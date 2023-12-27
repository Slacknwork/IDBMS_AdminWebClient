"use client";

import {
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

export default function FormNumberSimple({
  sx,
  title,
  titleSpan = 4,
  fieldSpan = 8,
  spacing = 2,
  required,
  disabled,
  variant = "outlined",
  subtitle = "",
  inputProps,
  value,
  error,
  errorLabel,
  onChange,
  startAdornment,
  endAdornment,
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
        <FormControl fullWidth>
          <TextField
            type="number"
            inputProps={inputProps}
            disabled={disabled}
            variant={variant}
            value={value}
            error={error}
            helperText={errorLabel}
            onChange={(e) => onChange(Number(e.target.value))}
            InputProps={{
              startAdornment: startAdornment && (
                <InputAdornment position="start">
                  {startAdornment}
                </InputAdornment>
              ),
              endAdornment: endAdornment && (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
