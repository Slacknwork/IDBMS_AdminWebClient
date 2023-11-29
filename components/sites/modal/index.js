"use client";

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function SiteModal({ children }) {
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // NAME
  const [name, setName] = useState("");
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <Box>
      <Button
        sx={{ mt: 2, mx: 2 }}
        variant="contained"
        disableElevation
        onClick={handleOpen}
      >
        {children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title">Tạo công trình mới</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <TextField
                  label="Tên"
                  variant="outlined"
                  value={name}
                  onChange={onNameChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <TextField
                  label="Tên"
                  variant="outlined"
                  value={name}
                  onChange={onNameChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel>Age</InputLabel>
                <Select label="Age">
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box
                sx={{ display: "flex", justifyContent: "flex-end" }}
                spacing={2}
              >
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleClose}
                >
                  Tạo
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
