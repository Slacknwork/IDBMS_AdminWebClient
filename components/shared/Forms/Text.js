"use client";

import { useState } from "react";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import colors from "/constants/color";

export default function FormText({
  sx,
  titleSpan = 4,
  fieldSpan = 8,
  spacing = 2,
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
  password = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

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
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: colors.disabledFormText,
              },
            }}
            disabled={disabled}
            multiline={multiline}
            rows={rows}
            variant={variant}
            value={value ?? ""}
            error={error}
            helperText={errorLabel}
            onChange={onChange}
            type={!password || showPassword ? "text" : "password"} // Toggle between text and password
            InputProps={{
              endAdornment: password && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
