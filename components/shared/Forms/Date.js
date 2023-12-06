"use client";

import React, { useState, useEffect } from "react";
import { FormControl, Grid, Typography } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment-timezone";

export default function DateForm({
  sx,
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
    const newIsoString = value ? moment(value) : null;
    setFormattedDate(value);
    onChange(newIsoString);
  };

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
          <LocalizationProvider
            dateAdapter={AdapterMoment}
            dateLibInstance={moment}
          >
            <DatePicker
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
