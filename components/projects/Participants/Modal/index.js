"use client";

import {
  Autocomplete,
  Modal,
  Box,
  Grid,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  p: 4,
};

const users = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

export default function ProjectDocumentModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Thêm thành viên
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={users}
              sx={{ mt: 2, width: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="Người dùng" />
              )}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl sx={{ mt: 2, width: 1 }}>
              <InputLabel>Vai trò</InputLabel>
              <Select labelId="demo-simple-select-label" label="Age">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={9}></Grid>
          <Grid item xs={12} lg={3}>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              fullWidth
            >
              Thêm
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
