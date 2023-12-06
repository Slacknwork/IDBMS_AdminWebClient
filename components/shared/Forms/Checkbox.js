import React from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
} from "@mui/material";

export default function FormCheckbox({
  sx,
  title,
  subtitle,
  required,
  checked,
  error,
  errorLabel,
  onChange,
}) {
  return (
    <Grid container columnSpacing={3} sx={sx}>
      {title && (
        <Grid item xs={6} lg={6}>
          <Typography variant="h5">
            {title}
            {required && <span style={{ color: "red" }}>*</span>}
          </Typography>
          <Typography variant="p">{subtitle || ""}</Typography>
        </Grid>
      )}
      <Grid item xs={title ? 6 : 12} lg={title ? 6 : 12}>
        <FormControl fullWidth>
          <FormControlLabel
            control={
              <Checkbox checked={checked} onChange={onChange} color="primary" />
            }
            label=""
          />
          {error && (
            <Typography variant="p" color="error">
              {errorLabel}
            </Typography>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
}
