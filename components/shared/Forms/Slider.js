import {
  FormControl,
  Grid,
  InputAdornment,
  Slider,
  Typography,
} from "@mui/material";

export default function FormSlider({
  sx,
  title,
  titleSpan = 4,
  fieldSpan = 8,
  spacing = 2,
  required,
  disabled,
  subtitle = "",
  value,
  min,
  max,
  onChange,
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
          <Slider
            value={value}
            onChange={(event, newValue) => onChange(newValue)}
            valueLabelDisplay="auto"
            disabled={disabled}
          />
          {endAdornment && (
            <Typography variant="caption" sx={{ mt: 1 }}>
              {endAdornment}
            </Typography>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
}
