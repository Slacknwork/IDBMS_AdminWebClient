import { FormControl, Grid, TextField, Typography } from "@mui/material";

export default function DateForm({
  sx,
  title,
  required,
  value,
  error,
  errorLabel,
  onChange,
}) {
  return (
    <Grid container spacing={2} sx={sx}>
      {title && (
        <Grid item xs={4} lg={4}>
          <Typography variant="h5">
            {title}
            {required && <span style={{ color: "red" }}>*</span>}
          </Typography>
        </Grid>
      )}
      <Grid item xs={title ? 8 : 12} lg={title ? 8 : 12}>
        <FormControl fullWidth>
          <TextField
            type="date"
            variant="outlined"
            value={value}
            error={error}
            helperText={errorLabel}
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
