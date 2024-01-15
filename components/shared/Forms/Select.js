import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import colors from "/constants/color";

export default function FormText({
  sx,
  title,
  titleSpan = 4,
  fieldSpan = 8,
  spacing = 2,
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
  disableOptions = [],
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
          <Select
            disabled={disabled}
            variant={variant}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            error={error}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: colors.disabledFormText,
              },
            }}
          >
            <MenuItem disabled value={defaultValue}>
              {defaultLabel}
            </MenuItem>
            {options.map((option, index) => (
              <MenuItem
                key={option}
                value={index}
                disabled={disableOptions.includes(index)}
              >
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
