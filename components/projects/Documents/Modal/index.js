"use client";

import {
  Modal,
  Box,
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
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
          Thêm tài liệu
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <FormControl sx={{ mt: 2 }} fullWidth>
              <TextField label="Tên" variant="outlined" />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl sx={{ mt: 2, width: 1 }}>
              <InputLabel>Loại file</InputLabel>
              <Select labelId="demo-simple-select-label" label="Age">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={12}>
            <FormControl sx={{ minWidth: 300 }} fullWidth>
              <TextField
                label="Mô tả file"
                multiline
                rows={5}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={4}>
            <FormControlLabel control={<Checkbox />} label="Công khai" />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              fullWidth
            >
              Chọn file
            </Button>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              fullWidth
            >
              Tải file
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
