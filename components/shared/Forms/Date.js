"use client";

import React, { useState, useEffect } from "react";
import { FormControl, Grid, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

export default function DateForm({
  sx,
  datetime,
  title,
  subtitle,
  required,
  value,
  error,
  errorLabel,
  onChange,
}) {
  const [formattedDate, setFormattedDate] = useState(dayjs(""));

  useEffect(() => {
    if (value === null) {
      setFormattedDate(dayjs(""));
      return;
    }
    const parsedDate = new Date(value);
    if (!isNaN(parsedDate.getTime())) {
      const formattedDateString = parsedDate.toISOString().slice(0, 10);
      setFormattedDate(dayjs(formattedDateString));
    }
  }, [value]);

  const handleDateChange = (value) => {
    const newIsoString = value ? new Date(value).toISOString() : null;
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
            dateAdapter={AdapterDayjs}
            adapterLocale={"en-gb"}
          >
            <DatePicker
              type={datetime ? "datetime-local" : "date"}
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
