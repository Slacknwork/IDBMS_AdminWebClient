"use client";

import {
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import colors from "/constants/color";

const formatNumberWithDots = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function FormNumber({
  sx,
  title,
  titleSpan = 4,
  fieldSpan = 8,
  spacing = 2,
  required,
  disabled,
  variant = "outlined",
  subtitle = "",
  defaultValue = 0,
  value,
  error,
  errorLabel,
  onChange,
  endAdornment,
}) {
  const [valueString, setValueString] = useState(
    value ? value.toString() : defaultValue.toString()
  );
  const handleValueStringChange = (value) => {
    // Extract numeric characters only
    const numericValue = value.replace(/[^0-9]/g, "");

    // Remove redundant leading zeros
    const nonZeroIndex = numericValue.indexOf(numericValue.match(/[^0]/));
    const trimmedValue = numericValue.slice(nonZeroIndex);

    // Split every three digits
    const formattedValue = formatNumberWithDots(trimmedValue);

    setValueString(formattedValue);
    onChange(Number(numericValue));
  };

  useEffect(() => {
    handleValueStringChange(value ? value.toString() : defaultValue.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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
                backgroundColor: colors.disabledBackgroundColor,
              },
              backgroundColor: disabled ? colors.disabledBackgroundColor : "",
            }}
            disabled={disabled}
            variant={variant}
            value={valueString}
            error={error}
            helperText={errorLabel}
            onChange={(e) => handleValueStringChange(e.target.value)}
            InputProps={{
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
