"use client";

import React, { useState, useEffect } from "react";
import { FormControl, Grid, Typography } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment-timezone";

import colors from "/constants/color";

export default function DateForm({
  sx,
  titleSpan = 4,
  fieldSpan = 8,
  spacing = 2,
  datetime,
  disabled,
  title,
  subtitle,
  required,
  value,
  error,
  errorLabel,
  onChange,
}) {
  moment.tz.setDefault("Asia/Ho_Chi_Minh");

  const [formattedDate, setFormattedDate] = useState(moment(""));

  useEffect(() => {
    if (value === null) {
      setFormattedDate(moment(""));
      return;
    }
    setFormattedDate(moment(value));
  }, [value]);

  const handleDateChange = (value) => {
    const newIsoString = value
      ? moment(value).format("YYYY-MM-DDTHH:mm:ss.SSSSSSS")
      : null;
    setFormattedDate(value);
    onChange(newIsoString);
  };

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
          <LocalizationProvider
            dateAdapter={AdapterMoment}
            dateLibInstance={moment}
          >
            <DatePicker
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: colors.disabledFormText,
                  backgroundColor: colors.disabledBackgroundColor,
                },
              }}
              disabled={disabled}
              type={datetime ? "datetime-local" : "date"}
              format="DD/MM/YYYY"
              variant="outlined"
              value={formattedDate}
              slotProps={{
                textField: {
                  error: error,
                },
              }}
              helperText={errorLabel}
              onChange={(newVal) => handleDateChange(newVal)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </LocalizationProvider>
        </FormControl>
      </Grid>
    </Grid>
  );
}
