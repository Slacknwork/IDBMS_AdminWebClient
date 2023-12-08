"use client";

import React, { useState, useEffect } from "react";
import { FormControl, Grid, Typography } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers/DateRangePicker";
import moment from "moment-timezone";

export default function DateRangeForm({
  sx,
  titleSpan = 4,
  fieldSpan = 8,
  spacing = 2,
  disabled,
  title,
  subtitle,
  required,
  valueStart,
  valueEnd,
  errorStart,
  errorEnd,
  errorLabelStart,
  errorLabelEnd,
  onChange,
}) {
  moment.tz.setDefault("Asia/Ho_Chi_Minh");

  const [dateRange, setDateRange] = useState({
    start: moment(""),
    end: moment(""),
  });

  useEffect(() => {
    if (valueStart === null) {
      setDateRange({
        start: moment(""),
        end: moment(""),
      });
    } else {
      setDateRange({
        start: moment(valueStart),
        end: moment(valueEnd),
      });
    }
  }, [valueStart, valueEnd]);

  const handleDateRangeChange = (newDateRange) => {
    const formattedDateRange = {
      start: newDateRange.start ? moment(newDateRange.start) : null,
      end: newDateRange.end ? moment(newDateRange.end) : null,
    };
    setDateRange(formattedDateRange);
    onChange(formattedDateRange);
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
            <DateRangePicker
              disabled={disabled}
              calendars={2} // Number of calendars to show for date range
              startText="Start Date"
              endText="End Date"
              value={dateRange}
              slotProps={{
                startTextField: {
                  error: errorStart,
                },
                endTextField: {
                  error: errorEnd,
                },
              }}
              helperText={errorStart ? errorLabelStart : errorLabelEnd}
              onChange={(newVal) => handleDateRangeChange(newVal)}
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
